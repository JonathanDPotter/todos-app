const About = () => {
  const classNames = {
    hr: "border-black border-2",
    h2: "text-xl text-center font-bold",
    p: "indent-4",
  };

  return (
    <div className="flex-1 flex flex-col gap-4 justify-center px-[25%]">
      <h2 className={classNames.h2}>About</h2>
      <hr className={classNames.hr} />
      <p className={classNames.p}>
        This is my final project for TrueCoders. It is a simple todo app that
        connects to a back end REST API with full CRUD functionality for both
        user profiles and todo items.
      </p>
      <h2 className={classNames.h2}>Technologies used</h2>
      <hr className={classNames.hr} />
      <p className={classNames.p}>
        This app is built using React, TypeScript, Redux, React-Router,
        Tailwindcss, and AutoAnimate.
      </p>
      <h2 className={classNames.h2}>Functionality</h2>
      <hr className={classNames.hr} />
      <p className={classNames.p}>
        Upon first visiting the website a user is instructed to log in to
        view/create todo items. The user can register a new profile with a
        username and password or log in to an existing profile. Once logged in,
        a user can create, read, update and delete todos, update their username
        or delete their profile entirely.
      </p>
    </div>
  );
};
export default About;
