export class MenuItemModel {
    label: string;
    icon?: string;
    routerLink?: Array<string>;
    items?: Array<MenuItemModel>;

    constructor(menuItemModel?) {
        menuItemModel = menuItemModel || {};
        this.label = menuItemModel.label;
        this.icon = menuItemModel.icon;
        this.routerLink = menuItemModel.routerLink;
        this.items = menuItemModel.items;
    }
}
