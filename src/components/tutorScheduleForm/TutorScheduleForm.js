import React from "react";
import axios from "axios";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {Button, Container, Form, Label, Title, Wrapper} from "../loginForm/LoginFormStyle"
import {DatePicker, TimePicker} from "antd";
import dayjs from "dayjs";

const TutorScheduleForm = () => {
    const navigate = useNavigate();

    const disabledDate = (current) => {
        // Can't pick today and the days before
        return current < dayjs().endOf('day');
    };

    const initialValues = {
        date: dayjs().add(1, 'day'),
        time: dayjs().add(6, 'hour'),
    };

    const onSubmit = async (values, actions) => {
        try {
            await axios.post("https://peers-backend-dev.up.railway.app/api/schedule/", {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
                date_time: `${values.date.format('YYYY-MM-DD')} ${values.time.format('HH:00:00')}`
            });
            actions.setSubmitting(false);
            console.log("Success");
            actions.setStatus("success");

            navigate("/tutor");

        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.code);
            actions.setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <Container>
            <Wrapper>
                <Title>Add/Edit Schedule</Title>
                <Form onSubmit={formik.handleSubmit}>
                    <Label>Date</Label>
                    <DatePicker
                        type="date"
                        id="date"
                        name="date"
                        data-testid="date"
                        onChange={(value) => formik.setFieldValue("date", value)}
                        value={formik.values.date}
                        defaultValue={dayjs()} format={'dddd, D MMMM YYYY'}
                        disabledDate={disabledDate}
                    />

                    <Label>Time</Label>
                    <TimePicker
                        type="time"
                        id="time"
                        name="time"
                        data-testid="time"
                        onChange={(value) => formik.setFieldValue("time", value)}
                        value={formik.values.time}
                        defaultValue={dayjs()} format={'HH:mm'}
                        onOk={(value) => formik.setFieldValue("time", value)}
                    />

                    <Button
                        type="submit"
                        disabled={formik.isSubmitting || formik.status === "success"}
                    >
                        {formik.isSubmitting ? "Processing..." : "Save"}
                    </Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default TutorScheduleForm;