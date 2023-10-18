#!/bin/env -S deno run --allow-net=irc-ws.chat.twitch.tv --allow-run=/usr/bin/pw-play,/usr/bin/kdialog

import { match } from "npm:ts-pattern@5.0.5"

import { messageRegex, pingRegex } from "./regex.ts"
import { onCapture } from "./on_capture.ts"

type Config = Record<"you" | "channel" | "alarm", string>

const configPath = import(Deno.args[0] ?? "./config.json", { with: { type: "json" } })
const { you, alarm, channel } = await configPath.then((x) => x.default as Config)

const ws = new WebSocket("ws://irc-ws.chat.twitch.tv:80")

const [password, id] = crypto.getRandomValues(new Uint32Array(2))

const connect = () =>
	[`PASS ${password}`, `NICK justinfan${id}`, `JOIN ${channel}`].forEach((cmd) => ws.send(cmd))

const onMessage = onCapture(messageRegex)(({ user, message }) =>
	user !== you && Promise.allSettled([
		new Deno.Command("/usr/bin/kdialog", {
			args: ["--title", user, "--passivepopup", message, "3"],
		}).output(),
		new Deno.Command("/usr/bin/pw-play", { args: [alarm] }).output(),
	])
)

const onPing = onCapture(pingRegex)(({ message }) => ws.send(`PONG :${message}`))

const message = ({ data }: MessageEvent<string>) =>
	match(data)
		.when(...onPing)
		.when(...onMessage)
		.otherwise(() => null)

ws.addEventListener("error", (event) => console.error("[Error]", event))
ws.addEventListener("open", connect)
ws.addEventListener("message", message)
ws.addEventListener("message", ({ data }) => console.info("[Info]", data))
