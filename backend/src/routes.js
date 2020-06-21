import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import SessionController from "./Controllers/SessionController";
import SpotController from "./Controllers/SpotController";
import DashboardController from "./Controllers/DashboardController";
import BookingController from "./Controllers/BookingController";
import ApprovalController from "./Controllers/ApprovalController";
import RejectController from "./Controllers/RejectController";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

routes.get("/dashboard", DashboardController.show);

routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejects", RejectController.store);

export default routes;
