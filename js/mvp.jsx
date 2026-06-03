const { useMemo, useState } = React;

    const screens = [
      ["home", "Inicio"],
      ["publish", "Publicar"],
      ["explore", "Catalogo"],
      ["map", "Mapa"],
      ["profile", "Perfil"]
    ];

    const user = {
      name: "Valeria Rojas",
      role: "Universitaria fashionista",
      points: 340,
      rating: 4.8,
      swaps: 18,
      campus: "UPC Monterrico"
    };

    const items = [
      { id: 1, name: "Blazer lino verde", size: "M", style: "Minimal", category: "Abrigos", points: 90, verified: true, owner: "Lucia", location: "Biblioteca PUCP", artClass: "photo-art-green" },
      { id: 2, name: "Jean recto vintage", size: "28", style: "Vintage", category: "Pantalones", points: 75, verified: true, owner: "Mateo", location: "Campus ULima", artClass: "photo-art-blue" },
      { id: 3, name: "Top satinado beige", size: "S", style: "Coquette", category: "Tops", points: 55, verified: false, owner: "Camila", location: "Cafeteria UPC", artClass: "photo-art-beige" },
      { id: 4, name: "Camisa oversize blanca", size: "L", style: "Streetwear", category: "Camisas", points: 65, verified: true, owner: "Diego", location: "Biblioteca UTEC", artClass: "photo-art-white" },
      { id: 5, name: "Falda denim midi", size: "M", style: "Vintage", category: "Faldas", points: 70, verified: false, owner: "Andrea", location: "PUCP Letras", artClass: "photo-art-denim" },
      { id: 6, name: "Casaca bomber oliva", size: "M", style: "Streetwear", category: "Abrigos", points: 110, verified: true, owner: "Renzo", location: "Parque Kennedy", artClass: "photo-art-olive" }
    ];

    const safePoints = [
      { name: "Biblioteca Central PUCP", area: "San Miguel", security: "Alta", className: "pin-pucp" },
      { name: "Campus ULima", area: "Surco", security: "Alta", className: "pin-ulima" },
      { name: "UTEC - Zona biblioteca", area: "Barranco", security: "Media-alta", className: "pin-utec" },
      { name: "UPC Monterrico", area: "Surco", security: "Alta", className: "pin-upc" }
    ];

    const history = [
      ["Vestido negro midi", "5 estrellas", "Encuentro en PUCP"],
      ["Polo tejido crema", "5 estrellas", "Delivery S/7"],
      ["Pantalon sastre", "4 estrellas", "Encuentro en UPC"]
    ];

    function App() {
      const [screen, setScreen] = useState("home");
      const [selected, setSelected] = useState(items[0]);
      const [deliveryMode, setDeliveryMode] = useState("meet");

      const goDetail = (item) => {
        setSelected(item);
        setScreen("detail");
      };

      const navItems = [...screens, ["confirm", "Confirmar"]];

      return (
        <div className="shell">
          <aside className="sidebar">
            <div className="brand"><span className="mark">CS</span><span>Closet Swap</span></div>
            <div className="points"><strong>{user.points}</strong><span>puntos disponibles</span></div>
            <nav className="nav">
              {navItems.map(([id, label]) => (
                <button key={id} className={screen === id ? "active" : ""} onClick={() => setScreen(id)}>{label}</button>
              ))}
            </nav>
          </aside>
          <div>
            <div className="mobile-top"><div className="brand"><span className="mark">CS</span><span>Closet Swap</span></div><strong>{user.points} pts</strong></div>
            <div className="tabs">
              {navItems.map(([id, label]) => <button key={id} className={screen === id ? "active" : ""} onClick={() => setScreen(id)}>{label}</button>)}
            </div>
            <main className="content">
              {screen === "home" && <Home setScreen={setScreen} goDetail={goDetail} />}
              {screen === "publish" && <Publish />}
              {screen === "explore" && <Explore goDetail={goDetail} />}
              {screen === "detail" && <Detail item={selected} setScreen={setScreen} />}
              {screen === "map" && <MapScreen />}
              {screen === "profile" && <Profile />}
              {screen === "confirm" && <Confirm item={selected} mode={deliveryMode} setMode={setDeliveryMode} />}
            </main>
          </div>
        </div>
      );
    }

    function Header({ title, subtitle, action }) {
      return (
        <div className="page-head">
          <div><h1>{title}</h1><p className="kicker">{subtitle}</p></div>
          {action}
        </div>
      );
    }

    function Home({ setScreen, goDetail }) {
      return (
        <>
          <Header title={"Hola, " + user.name.split(" ")[0]} subtitle="Tu closet circular esta activo en Lima." action={<button className="button" onClick={() => setScreen("publish")}>Publicar prenda</button>} />
          <div className="grid cols-4">
            <div className="card pad stat"><strong>{user.points}</strong><span>puntos para canjear</span></div>
            <div className="card pad stat"><strong>{user.swaps}</strong><span>intercambios efectivos</span></div>
            <div className="card pad stat"><strong>{user.rating}</strong><span>rating publico</span></div>
            <div className="card pad stat"><strong>3</strong><span>matches por filtros</span></div>
          </div>
          <div className="feed">
            <section className="card pad">
              <h2 className="section-title flush-top">Matches recomendados</h2>
              <div className="grid">
                {items.slice(0,3).map(item => <ItemRow key={item.id} item={item} onClick={() => goDetail(item)} />)}
              </div>
            </section>
            <section className="card pad">
              <h2 className="section-title flush-top">Proximo swap</h2>
              <p><strong>Camisa oversize blanca</strong></p>
              <p>Encuentro sugerido: Biblioteca UTEC, zona de recepcion. Alternativa: delivery integrado desde S/7.</p>
              <button className="button" onClick={() => setScreen("confirm")}>Confirmar intercambio</button>
            </section>
          </div>
        </>
      );
    }

    function Publish() {
      const [verified, setVerified] = useState(true);
      const [posted, setPosted] = useState(false);
      return (
        <>
          <Header title="Publicar prenda" subtitle="Describe el estado, estilo y talla para asignar puntos justos." />
          <div className="grid cols-2">
            <form className="card pad form" onSubmit={(e) => { e.preventDefault(); setPosted(true); }}>
              <div className="field"><label>Nombre de la prenda</label><input required placeholder="Ej. Blazer lino verde" /></div>
              <div className="grid cols-2">
                <div className="field"><label>Categoria</label><select required><option>Abrigos</option><option>Tops</option><option>Pantalones</option><option>Vestidos</option><option>Accesorios</option></select></div>
                <div className="field"><label>Talla</label><select required><option>S</option><option>M</option><option>L</option><option>28</option><option>30</option></select></div>
              </div>
              <div className="field"><label>Estilo</label><select><option>Minimal</option><option>Vintage</option><option>Streetwear</option><option>Coquette</option><option>Office casual</option></select></div>
              <div className="field"><label>Estado y detalles</label><textarea required placeholder="Sin manchas, usado 3 veces, tela fresca..." /></div>
              <div className="checkrow" onClick={() => setVerified(!verified)}>
                <div><strong>Sello Verificado</strong><p className="hint-text">Revision de calidad por S/3-5 para generar mas confianza.</p></div>
                <div className={"switch " + (verified ? "on" : "")}><div className="knob"></div></div>
              </div>
              <button className="button" type="submit">Publicar y calcular puntos</button>
              {posted && <div className="toast">Prenda publicada. Estimacion inicial: 80 puntos {verified ? "con sello Verificado." : "sin verificacion."}</div>}
            </form>
            <div className="card pad">
              <div className="photo photo-art-green"></div>
              <h2 className="section-title">Vista previa</h2>
              <p>Tu publicacion mostrara puntos, talla, estilo, categoria y estado de verificacion. La etiqueta de calidad aumenta la confianza antes del match.</p>
              <span className="badge">Verificado S/3-5</span>
            </div>
          </div>
        </>
      );
    }

    function Explore({ goDetail }) {
      const [filters, setFilters] = useState({ size: "", style: "", category: "" });
      const visible = useMemo(() => items.filter(item =>
        (!filters.size || item.size === filters.size) &&
        (!filters.style || item.style === filters.style) &&
        (!filters.category || item.category === filters.category)
      ), [filters]);
      const setFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
      return (
        <>
          <Header title="Catalogo y matches" subtitle="Filtra por talla, estilo y categoria para encontrar prendas canjeables." />
          <div className="filters">
            <select value={filters.size} onChange={e => setFilter("size", e.target.value)}><option value="">Todas las tallas</option><option>S</option><option>M</option><option>L</option><option>28</option></select>
            <select value={filters.style} onChange={e => setFilter("style", e.target.value)}><option value="">Todos los estilos</option><option>Minimal</option><option>Vintage</option><option>Streetwear</option><option>Coquette</option></select>
            <select value={filters.category} onChange={e => setFilter("category", e.target.value)}><option value="">Todas las categorias</option><option>Abrigos</option><option>Pantalones</option><option>Tops</option><option>Camisas</option><option>Faldas</option></select>
            <button className="button ghost" onClick={() => setFilters({ size: "", style: "", category: "" })}>Limpiar filtros</button>
          </div>
          <div className="grid cols-3">
            {visible.map(item => (
              <article className="card" key={item.id}>
                <div className={"photo " + item.artClass}></div>
                <div className="pad">
                  <h3>{item.name}</h3>
                  <div className="meta"><span>{item.size}</span><span>{item.style}</span><span>{item.category}</span></div>
                  <p>{item.points} puntos &middot; {item.location}</p>
                  <span className={"badge " + (item.verified ? "" : "warn")}>{item.verified ? "Verificado" : "Sin verificar"}</span>
                  <div className="actions-space"><button className="button" onClick={() => goDetail(item)}>Ver detalle</button></div>
                </div>
              </article>
            ))}
          </div>
        </>
      );
    }

    function ItemRow({ item, onClick }) {
      return (
        <article className="card item">
          <div className={"photo " + item.artClass}></div>
          <div>
            <h3>{item.name}</h3>
            <div className="meta"><span>{item.size}</span><span>{item.style}</span><span>{item.category}</span></div>
            <p className="compact-p">{item.points} puntos &middot; {item.location}</p>
            <button className="button" onClick={onClick}>Ver detalle</button>
          </div>
        </article>
      );
    }

    function Detail({ item, setScreen }) {
      return (
        <>
          <Header title={item.name} subtitle="Detalle de prenda y condiciones para intercambio." action={<button className="button ghost" onClick={() => setScreen("explore")}>Volver al catalogo</button>} />
          <div className="grid cols-2">
            <div className="card"><div className={"photo photo-large " + item.artClass}></div></div>
            <div className="card pad">
              <span className={"badge " + (item.verified ? "" : "warn")}>{item.verified ? "Sello Verificado" : "Pendiente de verificacion"}</span>
              <h2 className="section-title">{item.points} puntos</h2>
              <p>Publicada por {item.owner}. Estado: muy bueno, lista para intercambio. Punto seguro sugerido: {item.location}.</p>
              <div className="grid cols-2">
                <div className="card pad stat"><strong>{item.size}</strong><span>Talla</span></div>
                <div className="card pad stat"><strong>{item.style}</strong><span>Estilo</span></div>
              </div>
              <p>Opciones disponibles al confirmar: encuentro presencial en campus/biblioteca o delivery integrado por S/6-9.</p>
              <button className="button" onClick={() => setScreen("confirm")}>Solicitar intercambio</button>
            </div>
          </div>
        </>
      );
    }

    function MapScreen() {
      return (
        <>
          <Header title="Puntos de encuentro seguros" subtitle="Bibliotecas, campus y zonas visibles para swaps presenciales en Lima." />
          <div className="card map">
            {safePoints.map(point => (
              <div className={"pin " + point.className} key={point.name}>
                <strong>{point.name}</strong>
                <p className="hint-text">{point.area}</p>
                <span className="badge">Seguridad {point.security}</span>
              </div>
            ))}
          </div>
        </>
      );
    }

    function Profile() {
      return (
        <>
          <Header title="Perfil publico" subtitle="Historial y calificaciones para aumentar confianza en la comunidad." />
          <div className="card pad profile-top">
            <div className="avatar"></div>
            <div>
              <h2 className="profile-name">{user.name}</h2>
              <p>{user.role} &middot; {user.campus}</p>
              <div className="meta"><span>{user.swaps} swaps</span><span>{user.rating} estrellas</span><span>Miembro verificado</span></div>
            </div>
            <div className="stat"><strong>{user.points}</strong><span>puntos disponibles</span></div>
          </div>
          <div className="history">
            {history.map(([name, rating, method]) => (
              <div className="history-row" key={name}><strong>{name}</strong><span>{rating}</span><span>{method}</span></div>
            ))}
          </div>
        </>
      );
    }

    function Confirm({ item, mode, setMode }) {
      const [done, setDone] = useState(false);
      return (
        <>
          <Header title="Confirmar intercambio" subtitle="Elige delivery integrado o encuentro presencial seguro." />
          <div className="grid cols-2">
            <div className="card pad">
              <h2 className="section-title flush-top">{item.name}</h2>
              <p>{item.points} puntos seran reservados hasta que ambas partes califiquen el intercambio.</p>
              <div className="segment">
                <button className={mode === "meet" ? "active" : ""} onClick={() => setMode("meet")}>Encuentro presencial</button>
                <button className={mode === "delivery" ? "active" : ""} onClick={() => setMode("delivery")}>Delivery S/6-9</button>
              </div>
              {mode === "meet" ? (
                <div className="card pad"><strong>{item.location}</strong><p>Horario sugerido: lunes a viernes, 12:00-18:00. Zona visible y con seguridad.</p></div>
              ) : (
                <div className="card pad"><strong>Delivery integrado</strong><p>Costo estimado S/7. El courier recoge la prenda y valida entrega con codigo.</p></div>
              )}
              <button className="button confirm-button" onClick={() => setDone(true)}>Confirmar swap</button>
              {done && <div className="toast">Intercambio confirmado. Cuando finalice, se abrira la calificacion de 1 a 5 estrellas.</div>}
            </div>
            <div className="card pad">
              <h2 className="section-title flush-top">Post-intercambio</h2>
              <p>Despues del swap, ambas personas califican la experiencia. El historial queda publico en el perfil para mejorar seguridad y tasa de intercambios efectivos.</p>
              <div className="grid cols-3">
                {[1,2,3,4,5].map(star => <div className="card pad stat" key={star}><strong>{star}</strong><span>estrella{star > 1 ? "s" : ""}</span></div>)}
              </div>
            </div>
          </div>
        </>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
