import Image from "next/image";
import spinner from "@/images/loading-spinner.png";

export default function LoadingSpinner() {
    return (
        <Image src={spinner} alt="loading spinner" width={200} height={200} />
    )
}