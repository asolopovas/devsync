const configArg = Deno.args[0]

if (!configArg) {
    console.log(await Deno.readTextFile('./readme.txt'))
    Deno.exit(1)
}

const configJSON = await Deno.readTextFile(configArg)
const config = JSON.parse(configJSON)

const process = await Deno.run({
    cmd: [
        "ssh",
        `root@${config.sshHost}`,
        "mysqldump -uroot",
        config.remote.dbName
    ],
    stdout: 'piped',
    stderr: 'piped'
});
const output = await process.output() // "piped" must be set
const outStr = new TextDecoder().decode(output);

const localDBStr = outStr
    .replaceAll(config.remote.wpPath, config.local.wpPath)
    .replaceAll(config.remote.host, config.local.host)

await Deno.writeTextFile(`db/${config.remote.dbName}.sql`, localDBStr);




export {};
