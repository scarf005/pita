import $ from "https://deno.land/x/dax@0.35.0/mod.ts"

import { match } from "npm:ts-pattern@5.0.5"

import { messageRegex, pingRegex } from "./regex.ts"
import { onCapture } from "./on_capture.ts"

import conf from "./config.json" with { type: "json" }

const [password, id] = crypto.getRandomValues(new Uint32Array(2))

export const connect = (ws: WebSocket) => () =>
	[`PASS ${password}`, `NICK justinfan${id}`, `JOIN ${conf.channel}`].forEach((cmd) => ws.send(cmd))

const onMessage = onCapture(messageRegex)(({ user, message }) =>
	user !== conf.you && Promise.allSettled([
		$`kdialog --title ${user} --passivepopup ${message} 3`.spawn(),
		$`pw-play ${conf.alarm}`.spawn(),
	])
)

const onPing = (ws: WebSocket) => onCapture(pingRegex)(({ message }) => ws.send(`PONG :${message}`))

const message = (ws: WebSocket) => ({ data }: MessageEvent<string>) =>
	match(data)
		.when(...onPing(ws))
		.when(...onMessage)
		.otherwise(() => console.info("[Other]", data))

const app = (ws: WebSocket) => {
	ws.addEventListener("error", (event) => console.error("[Error]", event))
	ws.addEventListener("open", connect(ws))
	ws.addEventListener("message", message(ws))
}

if (import.meta.main) {
	const ws = new WebSocket("ws://irc-ws.chat.twitch.tv:80")

	app(ws)
}
