# AppFollow CLI

> A CLI to generate [AppFollow](https://appfollow.docs.apiary.io/#) reports

### Installing

`npm install -g appfollow-cli`

### Usage

```
appfollow-cli--help

Usage: appfollow-cli [options] [command]

Options:
  -V, --version                                   output the version number
  -h, --help                                      display help for command

Commands:
  reviews [options] <secret_id> <ext_id>          Reference: https://appfollow.docs.apiary.io/#reference/0/3.-reviews
  help [command]                                  display help for command
```

### Example

#### Review

`appfollow-cli reviews <secret_id> <ext_id> -c ./configs.json`

##### Example Config File

```
{
  "format": "csv",
  "csvDelimiter": "\t",
  "out": "./reviews.csv",
  "columns": [
    "date:Review Date",
    "author:Reviewer Name",
    "country:Reviewer Country",
    "rating:Star Rating",
    "title:Review Title",
    "content:Content of Review"
  ]
}
```
