import { NextApiRequest, NextApiResponse } from "next";

export default function hanlder( rq:NextApiRequest, rs:NextApiResponse ) {
  const date = new Date()
  rs.status(200).json({
    h:date.getHours(),
    m:date.getMinutes(),
    s:date.getSeconds(),
    ms:date.getMilliseconds()
  })
}