import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { enumToConfig } from '../constance/enums';

export function showSuccess(
    messageService: MessageService,
    summary: any,
    detail: any,
    life: any
) {
    messageService.add({
        severity: 'success',
        summary,
        detail,
        life
    });
}

export function showError(
    messageService: MessageService,
    summary: any,
    detail: any,
    life: any
) {
    messageService.add({
        severity: 'error',
        summary,
        detail,
        life
    });
}

export function numberValidator(formKeys: Array<string>): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        for (const keys of formKeys) {
            const value = formGroup.controls[keys].value;
            if (keys === 'telephone') {
                const myreg = /^0(\d{9,10}|\d{11})$/;
                const myregAfter = /^[0]\d{2,3}-\d{4}\s\d{3,4}$/;
                if (value && !/^\d*$/.test(value)) {
                    if (myreg.test(value) || myregAfter.test(value)) {
                        return null;
                        // tslint:disable-next-line:unnecessary-else
                    } else {
                        formGroup.controls[keys].setValue(value.replace(/[^0-9]/gi, ''), {
                            onlySelf: true
                        });
                    }
                }
            } else if (keys === 'mobilePhone' || keys === 'mobile') {
                const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                const myregAfter = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])-\d{4}-\d{4}$/;
                if (value && !/^\d*$/.test(value)) {
                    if (myreg.test(value) || myregAfter.test(value)) {
                        return null;
                        // tslint:disable-next-line:unnecessary-else
                    } else {
                        formGroup.controls[keys].setValue(value.replace(/[^0-9]/gi, ''), {
                            onlySelf: true
                        });
                    }
                }
            } else {
                if (value && !/^\d*$/.test(value)) {
                    formGroup.controls[keys].setValue(value.replace(/[^0-9]/gi, ''), {
                        onlySelf: true
                    });
                }
            }
        }

        return null;
    };
}

export function emailValidator(control: FormControl): any {
    if (isNull(control.value)) {
        return null;
        // tslint:disable-next-line:unnecessary-else
    } else {
        const myreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = myreg.test(String(control.value).toLowerCase());
        if (isNull(control.value)) {
            return null;
        }

        return valid ? null : {email: true};
    }
}

export function trimValidator(control: FormControl): any {
    if (isNull(control.value)) {
        return {required: true};
        // tslint:disable-next-line:unnecessary-else
    } else {
        const value = control.value.toString().trim();
        if (isNull(value)) {
            return {required: true};
            // tslint:disable-next-line:unnecessary-else
        } else {
            return null;
        }
    }
}

export function isNull(key: any): boolean {
    // tslint:disable-next-line:binary-expression-operand-order
    if (undefined === key || '' === key || null === key) {
        return true;
    }

    return false;
}

export function initList(list, listName, listShow) {
    list[''] = '';
    for (let i = 0; i < listName.length; i++) {
        list[listName[i].id] = listName[i].displayKey;
    }
    listShow = enumToConfig(list);

    return listShow;
}

export function initUserList(list, listName, listShow) {
    list[''] = '';
    for (let i = 0; i < listName.length; i++) {
        list[listName[i].userId] = listName[i].userName;
    }
    listShow = enumToConfig(list);

    return listShow;
}

export function showParse(nowTime) {
    const now = new Date(nowTime);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const currentTime = new Date();
    const yearNow = currentTime.getFullYear();
    const monthNow = currentTime.getMonth() + 1;
    const dateNow = currentTime.getDate();
    let dayCount = 0;
    let result = 0;
    dayCount = (month - 1) * 30 + date;
    result = (yearNow - year) * 365 + (monthNow - 1) * 30 + dateNow - dayCount;
    const show = (result / 365).toFixed(1);

    return show;
}

export function listParse(data: any, list: any, isWorkingYears: boolean) {
    if (isWorkingYears === true) {
        if (data === null) {
            data = '';
        } else {
            data = showParse(data);
        }
    } else {
        if (!isNull(data)) {
            data = list[data];
        }
    }

    return data;
}

export interface Data {
    value: any;
    label: any;
}

