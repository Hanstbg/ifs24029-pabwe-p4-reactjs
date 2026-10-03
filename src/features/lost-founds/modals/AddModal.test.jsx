import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, screen } from "../../../test-utils";
import * as lostFoundAction from "../states/action";
import AddModal from "./AddModal";

describe("AddModal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("tidak merender apapun saat isOpen false", () => {
    renderWithProviders(<AddModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByTestId("add-form")).not.toBeInTheDocument();
  });

  it("merender form saat isOpen true", () => {
    renderWithProviders(<AddModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByTestId("add-form")).toBeInTheDocument();
  });

  it("submit form memanggil asyncAddLostFound dan onClose saat sukses", async () => {
    const dispatchSpy = vi
      .spyOn(lostFoundAction, "asyncAddLostFound")
      .mockReturnValue(async () => true);
    const onClose = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<AddModal isOpen={true} onClose={onClose} />);

    await user.type(screen.getByLabelText(/judul/i), "Dompet Hilang");
    await user.type(screen.getByLabelText(/deskripsi/i), "Hilang di kantin");
    await user.selectOptions(screen.getByLabelText(/jenis laporan/i), "found");
    await user.click(screen.getByRole("button", { name: /simpan/i }));

    expect(dispatchSpy).toHaveBeenCalledWith({
      title: "Dompet Hilang",
      description: "Hilang di kantin",
      status: "found",
    });
    expect(onClose).toHaveBeenCalled();
    expect(screen.getByLabelText(/judul/i)).toHaveValue("");
    expect(screen.getByLabelText(/jenis laporan/i)).toHaveValue("lost");
  });

  it("tidak memanggil onClose saat gagal menambah", async () => {
    vi.spyOn(lostFoundAction, "asyncAddLostFound").mockReturnValue(async () => false);
    const onClose = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<AddModal isOpen={true} onClose={onClose} />);

    await user.type(screen.getByLabelText(/judul/i), "Dompet Hilang");
    await user.type(screen.getByLabelText(/deskripsi/i), "Hilang di kantin");
    await user.click(screen.getByRole("button", { name: /simpan/i }));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("klik tombol Batal memanggil onClose tanpa submit", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<AddModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: /batal/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("klik ikon tutup memanggil onClose", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<AddModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByLabelText("Tutup"));
    expect(onClose).toHaveBeenCalled();
  });
});
