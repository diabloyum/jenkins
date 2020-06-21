
import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class CommonUtilService {

    /**
     * Format order str to lower line
     * eg: displayUsername -> display_username
     */
    static toLowerLine(str) {
        const lowLine = '_';
        let temp = str.replace(/[A-Z]/g, match => lowLine + match.toLowerCase());
        if (temp && temp.slice(0, 1) === '_') {
            temp = temp.slice(1);
        }

        return temp;
    }

    /**
     * Check for numbers
     * @param formKeys
     */
    static numberValidator(formKeys: Array<string>): ValidatorFn {
        return (formGroup: FormGroup): ValidationErrors | null => {
            for (const keys of formKeys) {
                const value = formGroup.controls[keys].value;
                if (value && !/^\d*$/.test(value) || value > 564) {
                    formGroup.controls[keys].setValue(value.replace(/[^0-9]/gi, ''), {
                        onlySelf: true
                    });
                    if (formGroup.controls[keys].value) {
                        if (Number(formGroup.controls[keys].value) > 564) {
                            formGroup.controls[keys].setValue(564, {
                                onlySelf: true
                            });
                        }
                    }
                }
            }

            return null;
        };
    }

    /**
     * convert reference to list
     * @param list
     * @param listName
     * @param listShow
     */
    static initList(list, listName, listShow) {
        for (let i = 0; i < listName.length; i++) {
            list[listName[i].id] = listName[i].displayKey;
        }
        listShow = CommonUtilService.enumToConfig(list);

        return listShow;
    }

    /**
     * calculate date
     * @param startDate
     * @param endDate
     * @param unitOfTime
     */
    static calculateDate(startDate, endDate, unitOfTime) {
        return moment(endDate).diff(moment(startDate), unitOfTime);
    }

    static enumToConfig = E =>
        Object.keys(E).map(key => ({ value: key, label: E[key] }));
}
