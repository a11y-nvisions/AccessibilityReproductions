import { NextApiRequest, NextApiResponse } from "next";

export default function timer ( rq:NextApiRequest, rs:NextApiResponse ) {
  const date = new Date();
  if (rq.method == "GET") {
    rs.status(200).json({
      h:date.getHours(),
      m:date.getMinutes(),
      s:date.getSeconds(),
      ms:date.getMilliseconds()
    })
  }
}