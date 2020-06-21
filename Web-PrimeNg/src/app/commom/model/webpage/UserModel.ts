export class UserModel {
    uid;
    account;
    password;
    name;
    act;
    email;
    mobile;
    showAct;
    active;
    showActive;
    cid;
    showCompany;
    money;
    car;
    address;
    showFinish;
}
export class OrderModel {
    oid;
    uid;
    driver;
    start;
    end;
    cost;
    comment;
    finish;
    showUser;
    showDriver;
    showFinish;
    startname;
    endname;
    car;
    name: any;
    orderId;
    orderNumber;
    productName;
    orderPrice;
    orderComment;
    orderTime;
    orderStart;
}
export class ProductInfo {
productId;
productCore;
productName;
oneCategoryId;
twoCategoryId;
threeCategoryId;
price;
publishStatus;
auditStatus;
publishTime;
userfulStart;
userfulEnd;
modifiedTime;
prodectDesc;

}



export class GongxuModel {
    gid;
    cid;
    uid;
    name;
    showName;
}

export class CompanyModel {
    cid;
    name;
}

export class ThingsModel {
    tid;
    cid;
    uid;
    name;
    showName;
    count;
    finish;
    showFinish;
}

export class Attachment {
    aid;
    name;
    type;
    path;
    detail;
    time;
    cid;
}

export class CommentModel {
    commentid;
    cid;
    detail;
    uid;
    name;
}

export class CheckModel {
    checkid;
    cid;
    uid;
    standard;
    wucha;
    fact;
    level;
    showLevel;
    time;
    showTime;
    name;
}

export class QuestionModel {
    qid;
    cid;
    uid;
    name;
    detail;
    path;
    fpath;
    finish;
    showFinish;
}

export class RecordModel {
    did;
    name;
    path;
    bitsallocated;
    rows;
    columns;
    windowcenter;
    windowwidth;
    body;
    date;
    position;
    orientation;
    bitsstored;
}
