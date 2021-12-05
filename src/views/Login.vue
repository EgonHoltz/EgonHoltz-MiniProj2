<script>

export default {
    name: "Login",
    components: {},
    data: function() {
        return {    
            username: "",
            password: ""
        };
    },
    methods: {
        login() {
        this.$store
            .dispatch(`${MODULE_BASE}/${AUTH_LOGIN}`, this.$data)
            .then(() => {
                this.$alert(this.getMessage, "Login", "success");
                router.push({ name: "home" });
            })
            .catch(err => {
            this.$alert(`${err.message}`, "Erro", "error");
            });
        }
    }
};
</script>