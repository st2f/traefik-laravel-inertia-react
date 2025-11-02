import { forwardRef, useEffect, useRef } from "react";

interface TextInputProps {
  id?: string;
}

export default forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, ...props },
  ref,
) {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, [input, isFocused]);

  // @ts-ignore
  return (
    <input
      {...props}
      type={type}
      className={
        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
        className
      }
      ref={input}
    />
  );
});
