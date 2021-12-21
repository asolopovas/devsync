import getRemoteDBString from "./getRemoteDBString.ts"

const configArg = Deno.args[0]

if (!configArg) {
    console.log(await Deno.readTextFile('./readme.txt'))
    Deno.exit(1)
}

const configJSON = await Deno.readTextFile(configArg)
const config = JSON.parse(configJSON)

await getRemoteDBString(config)


export {};
