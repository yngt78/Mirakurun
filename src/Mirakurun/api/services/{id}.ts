/*
   Copyright 2016 Yuki KAN

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
"use strict";

import { Operation } from "express-openapi";
import * as api from "../../api";
import Service from "../../Service";

export const parameters = [
    {
        in: "path",
        name: "id",
        type: "integer",
        maximum: 6553565535,
        required: true
    }
];

export const get: Operation = (req, res) => {

    let service = Service.get(req.params.id);

    if (service === null) {
        // deprecated
        service = Service.all().find(item => item.serviceId === req.params.id);
    }

    if (service === null || service === undefined) {
        api.responseError(res, 404);
        return;
    }

    const ret: any = service.export();
    ret.hasLogoData = service.hasLogoData;

    res.json(ret);
};

get.apiDoc = {
    tags: ["services"],
    operationId: "getService",
    responses: {
        200: {
            description: "OK",
            schema: {
                $ref: "#/definitions/Service"
            }
        },
        404: {
            description: "Not Found",
            schema: {
                $ref: "#/definitions/Error"
            }
        },
        default: {
            description: "Unexpected Error",
            schema: {
                $ref: "#/definitions/Error"
            }
        }
    }
};