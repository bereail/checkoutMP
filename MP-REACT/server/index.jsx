import express from "express";
import cors from "cors";

//SDK de mercadoPago
import {MercadoPagoConfig, Preference} from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-6479854343719013-060419-7a098a06d19b3d4323cb0e8ddec19cf8-515245712",
});



const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server :) ");
});

//crea la preferencia
app.post("/create_preference", async (req, res) => {
    try {
        //create una constante con todos los item del producto
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://www.youtube.com/@onthecode",
                failure: "https://www.youtube.com/@onthecode",
                pending: "https://www.youtube.com/@onthecode",
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia: (",
        });
    }
});

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});