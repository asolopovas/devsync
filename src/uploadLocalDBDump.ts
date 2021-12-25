import { writeAll } from "https://deno.land/std@0.119.0/streams/conversion.ts";

export default async (data?: any) => {
    const decoder = new TextDecoder()

    Deno.chdir('/home/andrius/www/dev')

    const p = await Deno.run({
        cmd: [
            'docker',
            'compose',
            'exec',
            'mariadb',
            'mysql',
            '-uroot',
            '-psecret',
            'lcd_wp',
        ],
        stdout: 'piped',
        stderr: 'piped',
        stdin: "piped",
    })


    await writeAll(p.stdin, data)

    await p.stdin.close()

    const { code } = await p.status();
    const rawOutput = await p.output();
    const rawError = await p.stderrOutput();

    if (code === 0) {
        await Deno.stdout.write(rawOutput);
    } else {
        const errorString = decoder.decode(rawError);
        console.log(errorString);
    }

    Deno.exit(code);
}
