# PITA: PIco Twitch Alert

<img align="right" width="360" height="256" src="https://github-production-user-asset-6210df.s3.amazonaws.com/54838975/276272380-106d5de1-ada4-4099-93e4-0f228e7a2ae9.png" />

Is constantly checking for new chats you might have missed in your niche stream overly tiresome? Worry _more_, for there's PITA to send you pings for new chats.

## Features

- popup notification with custom sound
- works _only_ on my machine
- only 40 lines of code

## Usage

```sh
deno run --allow-net main.ts
```

## Requirements

> works _only_ on my machine

1. You're using KDE (`kdialog`).
2. You're using pipewire (`pw-play`).
3. You're using deno (`deno`).

## Configuration

edit [`config.json`](./config.json). i was too lazy to make it configurable via cli args, _so suffer_

```json
{
	"you": "your_twitch_username",
	"channel": "#your_twitch_username",
	"alarm": "/usr/share/sounds/Oxygen-Im-Irc-Event.ogg"
}
```

## _Why?_

[Chatty](https://chatty.github.io) is great but it's bit slow when the only you thing you need is getting notifications for chats.
