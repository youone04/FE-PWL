import { Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const Navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if(token){
      Navigate('/dashboard')
    }

  },[Navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const hasil = await fetch(`${process.env.REACT_APP_API}/api/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
      },
      });

      const res = await hasil.json();
      if(res.status === 200){
          localStorage.setItem('token',res.token);
          Navigate('/dashboard')

      }else{
        swal('failed',res.message,'warning')
      }
    } catch (error) {
      swal('failed', error.response && error.response.data.message
      ? error.response.data.message
      : error.message,'warning')
    }
  };

  return (
    <Container>
      <center>
        <Card style={{ width: "20rem", marginTop: "20%" }}>
          <Card.Body>
            <form>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">
                  Email address
                </label>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  id="form2Example1"
                  className="form-control"
                />
                {errors.username && (
                  <span className="text-danger">username is required.</span>
                )}
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  id="form2Example2"
                  className="form-control"
                />
                {errors.password && (
                  <span className="text-danger">password is required.</span>
                )}
              </div>
              <button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="btn btn-primary btn-block mb-4"
              >
                Sign in
              </button>
            </form>
          </Card.Body>
        </Card>
      </center>
    </Container>
  );
};

export default Login;
