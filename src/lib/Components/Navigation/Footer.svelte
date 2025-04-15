<script>
    import { Mail, Phone } from "lucide-svelte";
</script>
<footer>
    <div class="container grid grid-cols-1 md:grid-cols-4 gap-4 py-16">
        <div class="space-y-2">
            <img class="w-26 lg:w-32 h-auto" src="/images/brand/brandcompany.webp" alt="logo-marca">
            <p>
                Rua Bahia Nº 1491
                <br>
                Monte Castelo
                <br>
                Campo Grande - MS
            </p>
        </div>
        <div class="space-y-2">
            <h3 class="text-lg font-bold">Contato</h3>
            <p class="flex items-center gap-2">
                <Mail class="w-4 h-4" />
                contato@peixaria-oasis.com
            </p>
            <p class="flex items-center gap-2">
                <Phone class="w-4 h-4" />
                (69) 9 9999-9999
            </p>
        </div>
        <div class="space-y-2">
            <h3 class="text-lg font-bold">Redes Sociais</h3>
            <p>Facebook: <a href="https://www.facebook.com/peixaria-oasis" target="_blank">Facebook</a></p>
            <p>Instagram: <a href="https://www.instagram.com/peixaria-oasis" target="_blank">Instagram</a></p>
        </div>
        <div class="space-y-2">
            <h3 class="text-lg font-bold">Assinatura</h3>
            <p>Assine nossa newsletter para receber as melhores ofertas e novidades.</p>
        </div>
    </div>
    <div class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - Peixaria Oasis. CNPJ: 45223335/0001-07</p>
        </aside>
    </div>
</footer>