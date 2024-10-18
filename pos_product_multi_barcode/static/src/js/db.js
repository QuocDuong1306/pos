/** @odoo-module **/

import {patch} from "@web/core/utils/patch";
import { PosDB } from "@point_of_sale/app/store/db";



patch(PosDB.prototype, {
    _product_search_string(product) {
        var str = super._product_search_string(...arguments);
        if (product.barcodes_json !== '[]' && product.barcodes_json !== '') {
            const barcodes = JSON.parse(product.barcodes_json);
            barcodes.forEach(barcode => {
                str = str.replace("\n", "|" + barcode) + "\n";
            });
        }
        return str;
    },
    add_products(products) {
        var res = super.add_products(...arguments);
        var self = this;

        products.forEach(product => {
            var barcodes = JSON.parse(product.barcodes_json);

            barcodes.forEach(barcode => {
                self.product_by_barcode[barcode] = product;
            });
        });
        return res;
    },
});
