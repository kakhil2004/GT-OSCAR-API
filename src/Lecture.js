import got from 'got';
import FormData from 'form-data';
import * as cheerio from 'cheerio';

const head = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive"
}

function jsontoFormData(data) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (typeof value == "object"){
        for (const i of value) {
            formData.append(key, i);
        }
    }
    else {
        formData.append(key, value);
    }

  }
  return formData
}
  
export default class Lecture{
    constructor(subject,classNum){
      this.sub = subject
      this.num = classNum
    }
    async Init() {
      const payload = {
        "term_in": "202208",
        "sel_subj": [
          "dummy",
          this.sub
        ],
        "sel_day": "dummy",
        "sel_schd": [
          "dummy",
          "%"
        ],
        "sel_insm": "dummy",
        "sel_camp": [
          "dummy",
          "%"
        ],
        "sel_levl": "dummy",
        "sel_sess": "dummy",
        "sel_instr": [
          "dummy",
          "%"
        ],
        "sel_ptrm": [
          "dummy",
          "%"
        ],
        "sel_attr": [
          "dummy",
          "%"
        ],
        "sel_crse": this.num,
        "sel_title": "",
        "sel_from_cred": "",
        "sel_to_cred": "",
        "begin_hh": "0",
        "begin_mi": "0",
        "begin_ap": "a",
        "end_hh": "0",
        "end_mi": "0",
        "end_ap": "a"
      }
      const response = await got.post("https://oscar.gatech.edu/bprod/bwckschd.p_get_crse_unsec", {headers:head,body:jsontoFormData(payload)});
      console.log(typeof response.body)
      var soup = cheerio.load(response.body)
      console.log(soup.html())

    }

}
  
