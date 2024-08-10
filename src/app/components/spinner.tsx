
import { Spinner } from "flowbite-react";

export function LoaderSpinner() {

  return (
    <div className="flex items-center gap-2">
      <span> Loading...</span>
      <Spinner color={"warning"} aria-label="Default status example" />
    </div>
  )
}
