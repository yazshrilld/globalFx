import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";

const INITIAL_FIELD_VALUES = {
  rawStartDate: new Date(),
  rawEndDate: new Date(),
};

const TransactionFilter = ({ handleSearch, loading }) => {
  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: INITIAL_FIELD_VALUES,
    validationSchema: Yup.object().shape({
      rawStartDate: Yup.date().when("rawEndDate", (rawEndDate, schema) => {
        return schema.test({
          test: (rawStartDate) => rawStartDate < rawEndDate,
          message: "Start date cannot be a greater than end date",
        });
      }),
      rawEndDate: Yup.date().max(
        new Date(),
        "End date cannot be beyond today's date"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      await handleSearch(values);
    },
  });

  const handleDateChange = (field, value) => {
    setFieldValue(field, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start justify-between">
        <div className="min-h[100px] flex items-center flex-col">
          <DatePicker
            name="rawStartDate"
            onChange={(value) => handleDateChange("rawStartDate", value)}
            value={values.rawStartDate}
          />
          <p className="text-red-500 my-2 text-sm">
            {touched.rawStartDate && errors.rawStartDate && errors.rawStartDate}
          </p>
        </div>
        <div className="min-h[100px] flex items-center flex-col">
          <DatePicker
            name="rawEndDate"
            onChange={(value) => handleDateChange("rawEndDate", value)}
            value={values.rawEndDate}
          />
          <p className="text-red-500 my-2 text-sm">
            {touched.rawEndDate && errors.rawEndDate && errors.rawEndDate}
          </p>
        </div>
        <div className="min-h[150px] flex items-center w-[200px]">
          <Button
            bgColor="bg-yellow-400"
            textColor="text-white"
            text="Search"
            activeRingColor="ring-yellow-400"
            type="submit"
            loading={loading}
            loadingColor="#fff"
          />
        </div>
      </div>
    </form>
  );
};

export default TransactionFilter;
