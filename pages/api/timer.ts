import { Axios } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default function timer( rq:NextApiRequest, rs:NextApiResponse ) {
  const date = new Date()
  rs.status(200).json({
    h:date.getHours(),
    m:date.getMinutes(),
    s:date.getSeconds(),
    ms:date.getMilliseconds()
  })
}