import Swal from "sweetalert2";

export async function showSuccessDialog(message) {
  return Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
    confirmButtonColor: "#4f46e5",
  });
}

export async function showErrorDialog(message) {
  return Swal.fire({
    icon: "error",
    title: "Terjadi Kesalahan",
    text: message,
    confirmButtonColor: "#4f46e5",
  });
}

export async function showConfirmDialog(message) {
  const result = await Swal.fire({
    icon: "warning",
    title: "Apakah kamu yakin?",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Ya, lanjutkan",
    cancelButtonText: "Batal",
    confirmButtonColor: "#e11d48",
  });
  return result.isConfirmed;
}

export function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
