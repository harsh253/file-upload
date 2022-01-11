import axios, { Method } from "axios";

const fetchAsBuffer = () => {
  return axios.create({
    responseType: "arraybuffer",
  });
};

const fetchAsStream = () => {
  return axios.create({
    responseType: "stream"
  })
}

const waitNSec = async (n: number) => {
  return setTimeout(() => { }, n * 1000);
}

export { fetchAsBuffer, waitNSec, fetchAsStream };
