import { assertEquals } from "https://deno.land/std@0.204.0/assert/assert_equals.ts"
import { messageRegex } from "./regex.ts"
import { TypedRegEx } from "./typed_regex.ts"

Deno.test("messageParser", () => {
	const example = ":scarf005!scarf005@scarf005.tmi.twitch.tv PRIVMSG #scarf005 :Hello world!"
	assertEquals({ ...TypedRegEx(messageRegex).captures(example) }, {
		user: "scarf005",
		hostname: "scarf005@scarf005.tmi.twitch.tv",
		channel: "#scarf005",
		message: "Hello world!",
	})
})
