class CookieControl {
  private parseCookies(cookie: string) {
    return cookie
      .split(";")
      .map((v) => v.split("="))
      .map(([k, ...vs]) => [k, vs.join("=")])
      .reduce((acc: any, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
      }, {});
  }

  getCookieValue(cookie: any, key: string) {
    return this.parseCookies(cookie)[key];
  }
}

export default new CookieControl();
