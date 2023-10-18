export const messageRegex =
	"^:(?<user>.+)!(?<hostname>.+@.+\.tmi\.twitch\.tv) PRIVMSG (?<channel>#(.+)) :(?<message>(.+))\\s*$" as const

export const pingRegex = "^PING :(?<message>.+)\\s*$" as const
