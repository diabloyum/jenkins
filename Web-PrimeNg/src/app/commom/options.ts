import * as moment from 'moment';
import { isNull } from './utils/util';

export const statusOptions = [
    {value: 0, label: '管理员'},
    {value: 1, label: '司机'},
    {value: 2, label: '用户'}
];

export const fileType = [
    {value: 0, label: '文件'},
    {value: 1, label: '正常图片'},
    {value: 2, label: '优秀图片'}
];
export const startOptions = [
    {value: 0, label: '已下单'},
    {value: 1, label: '已支付'},
    {value: 2, label: '开发中'},
    {value: 3, label: '已交付'}
]
export const activeOptions = [
    {value: false, label: '未解决'},
    {value: true, label: '解决'}
];

export const finishOptions = [
    {value: false, label: '未完成'},
    {value: true, label: '完成'}
];

export const useOptions = [
    {value: false, label: '不可用'},
    {value: true, label: '可用'}
];

export const levelOptions = [
    {value: 0, label: '标准'},
    {value: 1, label: '轻度'},
    {value: 2, label: '中等'},
    {value: 3, label: '严重'},
    {value: 4, label: '紧急'}
];

export function parseStatus(status, options) {
    let newStatus = '';
    for (const i of options) {
        if (i.value == status) {
            newStatus = i.label;
            break;
        }
    }
    return newStatus;
}
export function formatDate(date) {
    return moment(new Date(date)).format(
        'YYYY-MM-DD'
    );
}
// tslint:disable-next-line:no-shadowed-variable
export function format(date, format) {
    return moment(new Date(date)).format(
        format
    );
}

export function initLineLabelMonth(num) {
    const dateOptions = [];
    const time = new Date(new Date().setMonth(new Date().getMonth() - num)); // '2019-08-10');
    for (let i = 0; i <= num; i++) {
        // const date = format(new Date().setDate(new Date().getDate() + i), 'yyyy-MM-dd');
        const date = moment(new Date(time).setMonth(time.getMonth() + i)).format('YYYY-MM');
        // dateOptions = [
        //     ...dateOptions,
        //     {value: date, label: `${date}`},
        // ];
        dateOptions.push(date);
    }
    return dateOptions;
}

export function initFullYearMonth(year) {
    const dateOptions = [];
    const time = new Date(new Date().setFullYear(year, 0));
    for (let i = 0; i <= 11; i++) {
        const date = moment(new Date(time).setMonth(time.getMonth() + i)).format('YYYY-MM');
        dateOptions.push(date);
    }
    return dateOptions;
}

export function sort(arr: Array<number>, begin: number, end: number): Array<number> {
    if (end <= begin) {
        return arr;
    }
    let i = begin;
    let j = end;
    const key = arr[begin];
    while (true) {
        while (true) {
            if (i == j) { break; }
            if (arr[j] < key) {
                const temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                break;
            }
            j--;
        }
        while (true) {
            if (i == j) { break; }
            if (arr[i] > key) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                break;
            }
            i++;
        }
        if (i == j) {
            break;
        }
    }
    if (end - j > 1) {
        arr = sort(arr, j + 1, end);
    }
    if (i - begin > 1) {
        arr = sort(arr, begin, i);
    }
    return arr;
}
