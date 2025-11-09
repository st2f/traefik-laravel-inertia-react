export default function SelectMenu({ className = '', items = [], selectedValue, ...props }) {

  return (
      <select
        {...props}
          value={selectedValue}
          className={
          'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm  ' + className
        }
      >
        {! selectedValue &&
          <option id='0' key='0' value='0'></option>
        }
        {items.map((i, idx) => (
          <option id={i.value ?? idx} key={i.value ?? idx} value={i.value}>{i.label}</option>
        ))}

      </select>
    );
  }
