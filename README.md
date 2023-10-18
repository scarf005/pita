# PITA: PIco Twitch Alert

Is constantly checking for new chats you might have missed in your niche stream overly tiresome? Worry _more_, for there's PITA to send you pings for new chats.

## Features

- popup notification with custom sound
- works _only_ on my machine

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

edit [`config.json`](./config.json) to customize:
- 

## _Why?_

[Chatty](https://chatty.github.io) is great but it's bit slow when the only you thing you need is getting notifications for chats.
