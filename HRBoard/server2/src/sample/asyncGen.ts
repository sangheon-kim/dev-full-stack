import fetch from "node-fetch";

let repo = "javascript-tutorial/en.javascript.info";

async function* fetchCommits(repo: string) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      headers: { "User-Agent": "Our script" },
    });

    const body = await response.json();

    let nextPage: any = response.headers.get("Link")?.match('/<(.*?)>; rel="next"/');
    nextPage = nextPage?.[1];

    url = nextPage;

    for (let commit of body) {
      yield commit;
    }
  }
}

(async () => {
  let count = 0;

  for await (const commit of fetchCommits(repo)) {
    console.log(commit.author.login);
    console.log(count);
    if (++count == 100) {
      // 100번째 커밋에서 멈춥니다.
      break;
    }
  }
})();
