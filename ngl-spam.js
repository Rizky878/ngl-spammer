const fetch = require("node-fetch");
const readline = require("readline-sync");
const chalk = require("chalk");
const delay = require("delay");
const Spinnies = require("spinnies");
const fakeuseragent = require("fake-useragent");
const spinnies = new Spinnies({
  spinner: {
    interval: 200,
    frames: ["∙∙∙", "●∙∙", "∙●∙", "∙∙●", "∙∙∙"],
  },
});
let link = "";
let teks = "";
let spam = 0;
var regex = /^(http|https):\/\/ngl.link/gi;
var regexngl = /ngl.link/gi;
console.log(
  "\033[1m\n" +
    "    _   __________ \n" +
    "   / | / / ____/ /    | NGL Spammer\n" +
    "  /  |/ / / __/ /     | Using Javascript\n" +
    " / /|  / /_/ / /___   | Coded By RzkyFdlh - \033[31;2mZacros \033[39;2mTeam\033[0;1m\n" +
    "/_/ |_/____/_____/    | Example: https://ngl.link/xxxx" +
    "\n\n"
);
const start = async () => {
  spinnies.add("spinner-1", { text: "Connecting to server...", color: "cyan" });
  const stat = await fetch("https://ngl.link");
  if (stat.status == 200) {
    await delay(4000);
    spinnies.succeed("spinner-1", { text: "Server Aktif!", color: "green" });
  } else {
    spinnies.fail("spinner-1", {
      text: "Server Error, Silahkan coba lain kali!",
      failColor: "redBright",
    });
    process.exit(1);
  }
  var pertanyaan = readline.question("Masukan Link/username: ");
  if (!pertanyaan) {
    console.log(chalk.cyan("Masukan Link Dengan Benar!"));
    return start();
  }
  link = regex.test(pertanyaan)
    ? pertanyaan
    : regexngl.test(pertanyaan)
    ? "https://" + pertanyaan
    : "https://ngl.link/" + pertanyaan;
  var teksnya = readline.question("Masukan Pesan: ");
  if (!teksnya) {
    console.log(chalk.cyan("Masukan Pesan Dengan Benar!"));
    return start();
  }
  teks = teksnya;
  var jumlah = readline.questionInt("Masukan Jumlah Spam: ");
  if (!jumlah) {
    console.log(chalk.cyan("Masukan Jumlah Dengan Benar"));
    return start();
  }
  spam = jumlah;
  spinnies.add("spinner-2", { text: "Starting, Wait...", color: "cyan" });
  await delay(5000);
  try {
    no = 1;
    for (let i of ".".repeat(spam)) {
      await delay(1000);
      spinnies.update("spinner-2", {
        text: "\nSedang Dalam Proses, Jangan Keluar Dari Program..",
        color: "yellow",
      });
      var response = await fetch(link, {
        headers: { "user-agent": fakeuseragent() },
        method: "POST",
        body: new URLSearchParams(Object.entries({ question: teks })),
      });
      console.log(
        chalk.yellow(no++ + "."),
        response.status != 200
          ? chalk.red(
              `Status: ${response.status} || StatusText: ${
                response.statusText == "OK" ? "Berhasil" : "Gagal"
              }`
            )
          : chalk.green(
              `Status: ${response.status} || StatusText: ${
                response.statusText == "OK" ? "Berhasil" : "Gagal"
              }`
            )
      );
    }
    spinnies.succeed("spinner-2", {
      text:
        "Sukses Mengirim!\nLink: " +
        link +
        "\nJumlah: " +
        spam +
        "\nPesan: " +
        teks,
      color: "green",
    });
  } catch (e) {
    spinnies.fail("spinner-2", {
      text: "Gagal!, Terjadi Error mungkin link yang kamu masukan invalid atau server terkena cloudflare sehingga tidak dapat diakses. Silahkan coba lagi..",
      failColor: "redBright",
    });
  }
};
start();
