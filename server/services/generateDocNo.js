const db = require('../models');
const moment = require('moment');
let t;

const generateDoc = async (tableName,column) => {
    try {
        t = await db.sequelize.transaction();
        const data = await tableName.findOne({
            order: [
                [column,'DESC']
            ]
        });
        await t.commit();
        let DocNo= ''
        if(column == 'orderNo') {
            if(data == null)
                DocNo = 'EVO' + moment(new Date).format('YYYYMM') +  '-00001' ;
            else {
                const value = parseInt(data.dataValues.orderNo.substring(data.dataValues.orderNo.length - 5, data.dataValues.orderNo.length))+1;
                DocNo = 'EVO' + moment(new Date).format('YYYYMM') +'-'+ String(value).padStart(5, '0')
            }
        }
        return DocNo;

    }
    catch (err) {
        if (t) {
            await t.rollback();
        }
        console.log(err.message)
        return err.message
    }
}

module.exports = { generateDoc }