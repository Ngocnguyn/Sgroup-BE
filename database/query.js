const excuteQuery = ({db, query, params}) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, rows) => {
            console.log(err)
            if (err) {
                reject(err);
            } else {  
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

const getOne = async ({db, query, params}) => { 
    const records = await excuteQuery({db, query, params});
    if (records.length > 0) {
        return records[0];
    }
    return null;
}

const getMany = async ({db, query, params}) => {
    const records = await excuteQuery({db, query, params});
    if (records.length > 0) {
        return records;
    }
    return null;
}

const create = async ({db, query, params}) => {
    const result = await excuteQuery({db,query,params});
    if (result.affectedRows > 0) {
        return true;
    }
    return false;
}
const update = async({db, query, params}) => {
    const result = await excuteQuery({db,query,params});
    return result?.affectedRows>0;
}
export {getOne, getMany, create,excuteQuery,update}