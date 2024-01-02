async function postData(uid, sql) {
    url = "https://arnavdb-manager.arnavium.workers.dev"
    const response = await fetch(url, {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "sql":sql,
        "uid":uid,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    
    response.text().then(function (text) {
      console.log(text)
    });
}
  
function runSQL(uid, sql){
  	if(uid){
    	sql = sql.split("FROM ").join(`FROM ${uid}_`)
    } else {
      throw Error("No uid specified on function 'runSQL'")
    }
  	console.log(sql)
    postData(uid, sql)
}

function append(){

}

function get(uid, ){

}

function replace(){

}

function del(){

}

function createTable(uid, name, cols){
    cols.forEach(function(col){
        if(col.length>255){
          throw Error(`Error - could not create table '${name}' as element '${col.slice(0,6)}...' exceeded limit of 255 chars`)
        }
    })

    cols = cols.map(function(el){return el+" varChar(255)"})
    sql = `CREATE TABLE ${uid}_${name} (${cols});`
    console.log(sql)
    postData(uid, sql)
}	

function DROPTABLE(){

}

runSQL("CONQ99", "SELECT * FROM NewTableTest1")
//console.log(createTable("ss", "arnav", ["username", "passwordpasswor", "uid", "gid", "guuji-ness"]))
//console.log(createTable("CONQ99", "NewTableTest1", ["username", "passwordpasswor", "uid", "gid", "guuji_ness"]))
//UID of ArnavN is "CONQ99"