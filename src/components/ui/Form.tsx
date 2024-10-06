import {FormEvent, ReactNode} from "react";

const Form = ({ children, onSubmit }: { children: ReactNode, onSubmit: (values: any) => void }) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget; // Get the current target of the event
        const elements = form.elements; // This will be of type HTMLFormControlsCollection
        const values: any = {}; // Initialize values object

        for (let i = 0; i < elements.length; i++) {
            const currentElement = elements[i] as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);
            if (currentElement.name) {
                values[currentElement.name] = currentElement.value; // Access name and value safely
            }
        }

        onSubmit(values); // Call onSubmit with collected values
    };

    return (
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            {children}
        </form>
    )
}

export default Form