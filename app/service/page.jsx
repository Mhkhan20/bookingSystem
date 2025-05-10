import { Suspense } from "react";
import ServiceClient from "./ServiceClient";

export default function ServicePage() {
  return (
    <Suspense fallback={<div>Loading service page...</div>}>
      <ServiceClient />
    </Suspense>
  );
}
