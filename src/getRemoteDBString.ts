export default async (config: any) => {
    const decoder = new TextDecoder()
    const encoder = new TextEncoder()
    let p = await Deno.run({
        cmd: [
            "ssh",
            `root@${ config.sshHost }`,
            "mysqldump -uroot",
            config.remote.dbName,
        ],
        stdout: "piped",
        stderr: "piped",
    })

    const rawOutput = await p.output()

    const pathRX = new RegExp(config.remote.path, "g")
    const hostRX = new RegExp(config.remote.host, "g")

    return encoder.encode(
        decoder
            .decode(rawOutput)
            .replace(pathRX, config.local.path)
            .replace(hostRX, config.local.host),
    )

}
