import { ApolloError } from 'apollo-server'
// import bcrypt from 'bcryptjs'

// import { allResolvers } from '../graphql/common/schema';
import * as mongo from '../mongo'
// import constant from '../mongodb/common/constant';

// const {
//     ROLE,
//     AUTH,
//     PERMISSION,
//     FEE_TYPE,
//     FEE_VALUE_TYPE,
//     MONEY_CURRENCY
// } = constant;

async function initData(list, model, field) {
  const existingDocs = await model.find()
  const existingDocNames = existingDocs.map(doc => doc[field])
  const newDocs = list.filter(doc => !existingDocNames.includes(doc[field]))
  if (newDocs.length) {
    const docsCreated = await model.insertMany(newDocs)

    if (!docsCreated) {
      throw new ApolloError('Init data sync failed!', '500')
    }
    return roleModel
  }
}
const ROLES = [{ permission: 'ADMIN' }, { permission: 'USER' }, { permission: 'MANAGE' }, { permission: 'REVIEWER' }]
export default async function createSeedData() {
  const { advise, blog, category, comment, menu, metaData, option, post, role: roleModel, setting, user } = mongo.models
  const _roles = []
  ROLES.forEach(role => {
    _roles.push({ name: role.permission, permission: role.permission })
  })
  initData(_roles, roleModel, 'name')

  //   // init category
  //   const listProductCategory = [
  //     { name: 'Thời trang nam', image: '' },
  //     { name: 'Điện thoại', image: '' },
  //     { name: 'Tivi', image: '' },
  //     { name: 'Laptop', image: '' },
  //     { name: 'Máy ảnh', image: '' },
  //     { name: 'Đồng hồ', image: '' },
  //     { name: 'Ví', image: '' },
  //     { name: 'Giầy', image: '' },
  //     { name: 'Thiết bị gia dụng', image: '' },
  //     { name: 'Giầy dép nữ', image: '' }
  //   ]
  //   await initData(listProductCategory, productCategoryModel, 'name')

  //   // init web
  //   const listWeb = [
  //     {
  //       url: 'http://www.gmarket.co.kr',
  //       description: '',
  //       image: ''
  //     },
  //     {
  //       url: 'http://www.wemakeprice.com',
  //       description: '',
  //       image: ''
  //     },
  //     {
  //       url: 'https://www.chuu.co.kr',
  //       description: '',
  //       image: ''
  //     },
  //     {
  //       url: 'https://memebox.com',
  //       description: '',
  //       image: ''
  //     }
  //   ]
  //   await initData(listWeb, webModel, 'name')

  //   // init permission
  //   const listPermission = []
  //   for (const r in PERMISSION) {
  //     listPermission.push({ name: PERMISSION[r] })
  //   }
  //   await initData(listPermission, permissionModel, 'name')

  //   // init api list
  //   const defautRole = await roleModel.find({ name: ROLE.Admin }).lean()
  //   const listApi = Object.keys(allResolvers)
  //     .map(ctr =>
  //       Object.keys(allResolvers[ctr]).map(api => ({
  //         name: api,
  //         requiredRole: defautRole.map(role => role.id)
  //       }))
  //     )
  //     .flat()
  //   const allroles = await roleModel.find().lean()
  //   listApi.map(api => {
  //     if (['updateUser', 'getCart', 'deleteAllCart'].includes(api.name)) {
  //       api.requiredRole = allroles.map(role => role.id)
  //     }
  //   })
  //   await initData(listApi, apiModel, 'name')
  //   // init Admin user
  //   const adminRoleId = await roleModel.findOne({ name: ROLE.Admin })
  //   const allPermissions = await permissionModel.find().lean()
  //   const defaultAdminUser = {
  //     username: 'admin',
  //     password: bcrypt.hashSync(AUTH.adminDefaultPass, 10),
  //     fullName: 'Admin',
  //     email: 'admin@cyberskill.tech',
  //     roleId: adminRoleId.id,
  //     permissionId: allPermissions.map(permission => permission.id),
  //     phone: '7777777',
  //     deliveryLocation: 'CyberSkill'
  //   }
  //   await initData([defaultAdminUser], userModel, 'username')

  //   //init Fee
  //   const feeData = [
  //     {
  //       feeType: FEE_TYPE.Purchase,
  //       valueType: FEE_VALUE_TYPE.Percent,
  //       unit: MONEY_CURRENCY.Korea,
  //       range: [
  //         {
  //           feeValue: 12
  //         },
  //         {
  //           minRange: 500000,
  //           feeValue: 9
  //         },
  //         {
  //           minRange: 1000000,
  //           feeValue: 6
  //         }
  //       ],
  //       isWholeSale: true,
  //       rangeWholeSale: [
  //         {
  //           feeValue: 5
  //         }
  //       ]
  //     },
  //     {
  //       feeType: FEE_TYPE.ShippingAtPurchasePlaces,
  //       valueType: FEE_VALUE_TYPE.Value,
  //       unit: MONEY_CURRENCY.VN,
  //       range: [
  //         {
  //           feeValue: 60000
  //         }
  //       ]
  //     },
  //     {
  //       feeType: FEE_TYPE.ShippingAtRecievePlaces,
  //       valueType: FEE_VALUE_TYPE.Value,
  //       unit: MONEY_CURRENCY.VN,
  //       range: [
  //         {
  //           minRange: 0.5,
  //           feeValue: 100000
  //         }
  //       ]
  //     }
  //   ]
  //   await initData(feeData, feeModel, 'feeType')
}
