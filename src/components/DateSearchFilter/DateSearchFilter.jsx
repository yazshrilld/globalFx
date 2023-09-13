import { useFormik } from "formik";
import { ReactComponent as TodayIcon } from "assets/svg/event.svg";
import { ReactComponent as DoneIcon } from "assets/svg/done.svg";
import { ReactComponent as ResetIcon } from "assets/svg/restart_alt.svg";
import * as Yup from "yup";
import InputFormField from "components/InputFormField";
import IconButton from "@mui/material/IconButton";

const DATE_FIELD_VALUES = {
  rawStartDate: "",
  rawEndDate: "",
};

const validationSchema = Yup.object().shape({
  rawStartDate: Yup.date().when("rawEndDate", (rawEndDate, schema) => {
    return schema.test({
      test: (rawStartDate) => rawStartDate < rawEndDate,
      message: () => "Start date cannot be greater than end date",
    });
  }),
  rawEndDate: Yup.date().max(
    new Date(),
    "End date cannot be beyond today's date"
  ),
});

const DateSearchFilter = () => {
  const handleSubmit = async (values, { resetForm }) => {
    const {rawStartDate, rawEndDate, ...rest} = values
    console.log("Search Values: ",  ...rest );
  };

  const formik = useFormik({
    initialValues: DATE_FIELD_VALUES,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center gap-3 justify-between">
        <IconButton className="">
          <TodayIcon className="w-7 h-7"/>
        </IconButton>
        <div className="min-h[100px] flex items-center flex-col">
          <InputFormField
            name="rawStartDate"
            placeholder="Start Date"
            value={formik.values.rawStartDate}
            pattern="\d{2}-\d{2}-\d{4}"
            type="date"
            onChange={formik.handleChange}
            touched={formik.touched.rawStartDate}
            error={formik.errors.rawStartDate}
          />
        </div>
        <div className="min-h[100px] flex items-center flex-col">
          <InputFormField
            name="rawEndDate"
            placeholder="End Date"
            value={formik.values.rawEndDate}
            pattern="\d{2}-\d{2}-\d{4}"
            type="date"
            onChange={formik.handleChange}
            touched={formik.touched.rawEndDate}
            error={formik.errors.rawEndDate}
          />
        </div>
        <IconButton className="">
          <DoneIcon className="w-7 h-7"/>
        </IconButton>
        <IconButton className="">
          <ResetIcon className="w-7 h-7"/>
        </IconButton>
      </div>
    </form>
  );
};

export default DateSearchFilter;
