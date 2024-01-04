async function postData(uid, sql) {
  const url = "https://arnavdb-manager.arnavium.workers.dev"
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
  return response.text().then(function (responseText) {return responseText})

}
function runSQL(uid, sql){
  switch(uid, sql){
    case !uid&&!sql:{
      throw Error("No uid or sql specified on function 'runSQL'")
    }
    case uid&&!sql:{
      throw Error("No sql specified on function 'runSQL'")
    }
    case !uid&& sql:{
      throw Error("No uid specified on function 'runSQL'")
    }
    case uid&& sql:{
      sql = sql.split("FROM ").join(`FROM ${uid}_`)
      return parseOutput(uid, postData(uid, sql))
    }
    default:{
      throw Error("Error in input")
    }
  }
}

function append(uid, tableName, data){
  if(!uid){
    throw Error("No uid specified on function 'append'")
  }
  if(!tableName){
    throw Error("No tableName specified on function 'append'")
  }
  if(!data){
    throw Error("No data specified on function 'append'")
  }
  data = data.map(function(el){return `"${el}"`})
  const sql = `INSERT INTO ${uid}_${tableName} VALUES (${data.join(",")})`
  return parseOutput(uid, postData(uid, sql))
}

function get(uid, table, condition=true){
  if(!uid || !table || !condition){
    throw Error("Function 'get' is missing parameters 'uid' or 'table'")
  }

  if(condition==true){
    const sql = `SELECT * FROM ${uid}_${table}`
    return parseOutput(uid, postData(uid, sql))
  } else {
    const sql = `SELECT * FROM ${uid}_${table} WHERE ${condition[0]}="${condition[1]}"`
    return parseOutput(uid, postData(uid, sql))
  }
  
}

function del(uid, table, condition=true){
  if(!uid || !table){
    throw Error("Function 'del' is missing parameters 'uid' or 'table'")
  }
  if(condition==true){
    const sql = `DELETE FROM ${uid}_${table}`;
    return parseOutput(uid, postData(uid, sql))
  } else {
    const sql = `DELETE FROM ${uid}_${table} WHERE ${condition[0]}="${condition[1]}"`;
    return parseOutput(uid, postData(uid, sql))
  }
  
}

function createTable(uid, name, cols){
  if(!uid){
    throw Error("Function 'createTable' is missing parameter 'uid'")
  }
  if(!name){
    throw Error("Function 'createTable' is missing parameter 'name'")
  }
  if(!cols){
    throw Error("Function 'createTable' is missing parameter 'cols'")
  }
  cols.forEach(function(col){
      if(col.length>255){
        throw Error(`Error - could not create table '${name}' as element '${col.slice(0,6)}...' exceeded limit of 255 chars`)
      }
  })

  cols = cols.map(function(el){return el+" varChar(255)"})
  const sql = `CREATE TABLE ${uid}_${name} (${cols});`
  return parseOutput(uid, postData(uid, sql))
}	

function DROPTABLE(uid, tableName){
  if(!uid){
    throw Error("Function 'DROPTABLE' is missing parameter 'uid'")
  }
  if(!tableName){
    throw Error("Function 'DROPTABLE' is missing parameter 'tableName'")
  }
  const sql = `DROP TABLE ${uid}_${tableName}`
  console.log(sql)
  return parseOutput(uid, postData(uid, sql))
}

async function parseOutput(uid, output){
  output = await output
  if(output.includes("D1_ERROR")){
    throw Error(output.replace('D1_ERROR:', "ERROR").replace(uid+"_", ""));
  } else {
    return JSON.parse(output)
  }
}

//<script src="https://adb-docs.pages.dev/user.js"></script>
console.log("ArnavDB script loaded successfully")