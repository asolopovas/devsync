import uploadLocalDBDump from "./uploadLocalDBDump.ts"

export default async (config:any) => {
    let p = await Deno.run({
        cmd: [
            "ssh",
            `root@${config.sshHost}`,
            "mysqldump -uroot",
            config.remote.dbName
        ],
        stdout: 'piped',
        stderr: 'piped'
    });

    const rawOutput = await p.output();
    await uploadLocalDBDump(rawOutput);
}
