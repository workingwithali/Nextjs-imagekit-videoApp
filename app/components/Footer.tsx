export default function Footer() {
    return (
        <footer className="w-full bg-black text-center p-4 border-t border-purple-600 text-purple-500">
            © {new Date().getFullYear()} MyVideoApp. All rights reserved.
        </footer>
    );
}
  