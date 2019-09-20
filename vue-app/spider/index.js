const https = require('https')
const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')
const moviesDir =  './moviesData/'
const url = 'https://www.mi.com/'
function doSpider() {
  https.get(url,res=>{
    let html = ''
    res.on('data',(chunk)=>{
      html +=chunk
    })
    res.on('end',(response)=>{
      
    })

  })
}

