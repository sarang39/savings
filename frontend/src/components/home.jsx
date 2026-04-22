import { useContext } from "react"
import "./home.css"
import { MyContext } from "./Mycontext"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import Profile from './profile';



export default function Home() {
    const [maptransaction, setmaptransaction] = useState([])
    const navigate = useNavigate();
    const { mapuser, setmapuser, transactonData } = useContext(MyContext)
    const totalAmount = transactonData.reduce(
        (sum, item) => sum + item.weeklypayment, 0
    );
    function profile_disply(id) {
        navigate(`/profile/${id}`)
    }
    useEffect(() => {
        const loadData = async () => {
            await Featchuser();
            await GetAlltransactions();
        };

        loadData();
    }, []);
    useEffect(() => {
        console.log("maptransactions updated:", maptransaction)
    }, [maptransaction])
    useEffect(() => {
        console.log("mapuser updated:", mapuser)
    }, [mapuser])

    async function Featchuser() {
        try {
            const response = await axios.get("https://savings-hndc.onrender.com/api/users/getallusers")
            setmapuser(response.data)
            console.log("mapuser", response.data)
            console.log("setmapuser", mapuser)
        }
        catch (err) {
            console.log("error in featch:", err)
        }
    }

    async function GetAlltransactions() {
        try {
            const res = await axios.get(`https://savings-hndc.onrender.com/api/transactions/listTransactions`)
            setmaptransaction(res.data)

        }
        catch (err) {
            console.log("error in featch transaction:", err)
        }
    }
    return (
        <div>
            <div className="start">
                <div >
                    <h1>THE JOURNEY OF OUR TEAM</h1>
                    <p>This project is a Web-Based Savings Management System developed using the MERN Stack The system is based
                        on a real-world idea where a group of friends save an amount per week for two years.
                        The main aim of the application is to digitally manage, track, and monitor weekly savings in a transparent and organized way.
                    </p>
                </div>
                <div >
                    <div className="forimage">
                    </div>
                    <div className="forimagebackground"></div>
                </div>
            </div>
            <section class="counter-section" >
                <div class="counter-box">
                    <div class="number">7</div>
                    <p>Users</p>
                </div>

                <div class="counter-box">
                    <div class="number">{totalAmount}</div>
                    <p>Total Amount</p>
                </div>

                <div class="counter-box">
                    <div class="number">9800</div>
                    <p>Total Fine Amount</p>
                </div>
            </section>
            <div className="coverpage">
                <div>
                    <h1>Save For Tomorrow </h1>
                    <p>In life saving is the best way to be free .make saving as habbit for better tomorrow </p>
                </div>
                <div >
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhITEBIWFRUWFRUYFxUYFRYYFRUVFhUWFxUVFRgYHSggGRslGxUWIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLSstLS0tLf/AABEIAMIBBAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYHAf/EAEQQAAEDAgMFBQQGBwYHAAAAAAEAAgMEERIhMQUGQVFhEyJxgZEUMqGxByMzQlLBYnKCkqLR8BUWU2Nz4SRDg4SUssL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAkEQEBAAIBAwUAAwEAAAAAAAAAAQIREgMhMRMyQVFhInGxFP/aAAwDAQACEQMRAD8A9pREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEUavqhG25Ut0slt1EglAVzjtsAn3L9blSIalruBB6FZ5x3/AOezyvEVayoc3jib8QpzJ2kXBWpXLLp2NiLUZlW7Q2/FE4MJxSn3YWDHKf2RoOpsE3CdPKrdFVU9bO4XfGyEcGud2j/2g2zWnzKlNrRxIv4WTcX08ktFoFSOK09uQb8L+Itf4JtPTqaiIqwIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICrNvQ4mDofmrNYTR4mkHipZuNYZccpXJQ06mxQLaILGxW8ZLjI+hctgaRmPMLA2xXGiyc5YlaSRs7fl81FipIoMboo2te/3nAd4+J1K3NGea3uia5GbqK+CsIPezC11e0i04XAFp08FLnprKp2nBdp6aKbsa1L3SG1IuBfI+7np08FvirC3jdc1S3xNz4j5roqRzXMGQ0VncskXNFXh+ROamrkp2FhxNP+y6DZdaJGdRqty/Dy9Xp6/lPCaiItOAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgiVkeYPr+ShOKm7QdkPNVkgJDgCQSCARqLjUdQueXl7Ol7WYK2sj4ql3U2E2jpo6dr3SYS5znuyLnPcXONuAudFY7YbP2Y9lID8QuTbJud7Xyvp8VJG7dRNLFqdlotseIMbjILrDERoXWzI81FqZMlWZ3bfaAciq/aHunwWp8llDrKkkELNrrMUCndndWdBJZo/riqV19FMp6i1gVJWssVy51xYrVsmp7OUA6HI/ktIlUGaou644K2sTHcsehItNHJiY08wty7Pn2aEREQREQEREBERAREQEREBERAREQEREBERBA2hrboomCyl1p71+ihGVcsvL29L2smvsVIZMDoo4mB94KHWOw5g5I3ZtZSvVZUSXK+Mq8QUaRylq446YTvVfK9SZnKFIVl1jBy1ucsisHNRWfak6lfYmkkW4rW1il00XeaeSJbp3GyD9UPNTVE2W20bfMqWu88Pl5+6iIirIiIgIiICIiAiIgIiICIiAiIgIiICIiCBtQZAqszvplbXrfT0V5WR4mEcbXC5mOtBuFyz8vZ0LvHSUXadSo9cO6VmKkKBtCsFrDVZ276qLRSHFZTXhVNHIcVypr51nbVfJVFkWb5VGllTZI+krAlajKtbpk2uktisdnMxPa0alUrJHHRdTuZQG7pn6Dut6nifJXHvdOfVvHG11cbLAAcAskReh80REQEREBERAREQEREBERAREQEREBFrneQ0kC5HM2HiVq9q1FrW1PDy5rNykXSSi53bNcWsyPefpnmG8Tnxt8VD2fVSOxYHE2GQJOv6RccxropzXi6eorGR5vcG+Jt46rj9tRtL3OhuDq5hyzPEWOY45c1ZvZIR9Zn0s0jTP3godXS2AthwtzIDQ0gc2kHK3LQrnllt0wvG7jnpKxw0KjmUk5lbdrRkEkC46clRyV9tT/XVca+lj3m3QQyWW0zLnodoA6G6kipTZpZPkWh71HE+SxllyTa6bi5Yk55qpqtoYSBmSdABcnwHFVrNr4jlwNj0IysVU3I7KiYXmzB8QL25XVqzatXCGsJYxoFmgAn1t/Wapt1JhjBPI/JdDW1jI7uJGI6C5P9Zei1j2eTr+7TU3b1SXNbjGZsLAgnwBCsaHbj+07MXle2web4W4jwHOyq6OleLyOv2r9OIjaePit8OyQIyG4r2yu92Zz1Wt157I68VQAvI5o6A3WuPasRLgHafEcxbh4rh543sDg+4JtgtcgWPeJtr5qTu9m+V2HDZreHHMn5Bb51njHdtdcA819VFRbyMdhGFwJyFgT8lcxTB2l/RdJlKzpsREVQREQEREAL6vgRARFpnqmMF3uAHUoNyjz1WHRpd0Bbl45qtdtoPdhiIA4udcfut1PwXM7yVTXnC94iYD/i9m9x5kgg26Lnln9NSOjrNqOdG/A3M4mjvWudPezAP5rnJ96JYrMfRS6ZESRu4feLi3jxXJ17KN/cNcAATmKkG3P3nYlHosTX4KLarZja/ZPIlBtr3bE2XK22tdnS023DK84oJw++Yc1gvYaNOOxHqrClrnB2UczAODonkerQQVykm88tPf2qGNn6UUhjJt/lyXHxCiyb9xPwtFXhv+KIWbfm4BzfjZWXavRv7RyxPuPUD45haX1ccgtjBB5EW8MlylJWujtJVzRdi4XbI2Oz38sw/AfFoWuffKhfdjZI3dZw4DoBdoHxT+l7LPa+0o2XDnWGgJuL5X4riNr1ON+FgJvqQDp/NdXSOLgXMALSP+WGGMeYH/ANLS6mjOTpHNcci6wt4Yrm3lmsa7vT6146cNVU8gPcLmng0H5hXm6FWZccc32jOWhaefC/PxC6Ofd4NaMJB45EYneDnGyiw0wYQTDJGRzGfXxHmrdfTOGVl3tPfTADJRJmABTYXl+IRgkjhp8TYHyUaTZ08jsIa1vUm9v3cvisvR6mP24baG23tqJGw8LDgNBzI5nmqlr6p0jn4G3dme+0Z89V28/wBHAaHyOnBNyXE2aBxPBb9k7pZtDGHE8ZXFu7kcbriwGmQBJ06Lt208dyu9tW5752m722xAhpzdbS5AAzNtLdV2lHTd+5Ic8N7rS5zsJ5yHOxvwHXyjRUjmNcac4nDuvlcBc4TYsiboGjMX+eqtAztosdOxhlHvsLiwE2PEA+pGiwmWVvlJgp3MaMT8TjcucWnvHoBp4LGTaDWtB948bAixtfO+ijRipsb07he18M8RB9WAqnnr3teWminJGV+2gAsOPeGeqsYWde17ntbILOIHdyI49el/JfaZ4gpaieS9hiNmi5OEBlm8yXfNVDduSPJ7OhqHu4XmiueYHdJt1PNWNVtFzIWQytZTOuLM7QTSGxvYtaOJ4lLRD3Q3nL32ljZEw5MYXXceWJwOR6EL0ZlSzLO3TRcC2misHTxsjuL5C0h8GC98+gVls7FfBHcx5hzZc7AfhwggX6lXG8WbNuxDxzCyVLsqna0uwggOdexN7WAHdtoMr+auLrrjds2MkXxfVpBERAREQfHMB1/NRpNnRHVgPjdY120WRNc517N5cTyCpJt7G3LcJabci4jqQ0G3DVYuUiyVt23C1gypy/LIhw/NwXm29tIZso2hj7j75e61jlZhcrrbG+zHCwmj6FxbYno3QeagUm+FHI4ipMMdgPrWOc255WaD6my4ZTddI8/l3NqnxukbLGbH3bjFrbQ5rdQ0FZSODnT0xbY92R8WfQYiHN8iF6SKKkmFoZoXk2wh5bcjX3SLHLoFU1e50YcC6lawW94RjDcZ3NiWi/IWWpe2k0oodvh4tLP2R5SPirKa/r2rP2cgt8W6JqSXGmh7LAXe0U87TG61sgx98/MaFXbN36CZoYYo2OGWJrQMRAzNtBxy+K0f3OMMZdsypwSH3jiLWutzDbtd4HJZ8Dl3tgigEQbHhz+1ZNBJckm/atL4z06LKHYkEjARTTPPOnqYaj+ESNd6hW8m1axjHiohgmc3k1oBt+Ls7G6qNm19NVyBklDHHKbYHNncwON9Guc11ncgrMvNNBpxC0MibJGRe3a087JG6n7WnOK3iSFFFXWMu4TSYRxe8vaP/KjHxcrKeappnlg9vYW54HuiqYsPC3aZW9FtG/gAIkp2OOoJjewh1rEuEclneAAWpRqodt7UDQ6MRyNOjuzLgeYBpnn4qSfpBr4haSKEHqXt/wDe/wAVAot6w4ltTUGOMm9qeN0TmnibOY8P4akHqpT9q0ueHbM/QOpGHLrdoCmxsP0o1J96ngd4S/7FbIvpRktZ9CD+rM75BliquXadO7I10T+r6BgPqJAtb6qhiHaOkpZiLWY2KZjr+Alc0+ib/P8AR0tLvm6dpb7LLc6NyEY6ktZiv4Wuup2JDIYnNc4Rufmezhc1xaOGKR2flZeWT700UhBNMRbINildH4k2GZ8Vspttwk5bOqnA5AiYv+bSFNVdvURC1uTWTOtpaNov4HCVrkrpmkCKF8dvvOLXH0fLEOPG/gvNajeiCO7TSTx3zLBU9nf9ZrWfNZbM31o45GvbQOa4H3+0a8+B+quQnc7PTId5A7DHIXCQ6fW0+Jx/04JJCtG1aiCnLe2ZNM94xBjI8Ddbd57yDe/UX5LhJ9vtkqHVFHVspw6xMD5ZmsL+JbcMay/ja66dm8F2dvUxwPc0hjX+2skBBuQA2NmO+uWd+absOz5Ubekqm9jTRT0wPFmGNxz45En95IKSKjbeomEJIzL34pj5MxSH0F+igVW0auoLGMbJSQObm5rWxAm5As5ri8i1syb56CyodsbnVFIc2OnZJmJmm7bn7ryTcHrx4KbHXUe89O4u9na55BtjlBDSfxdmDiI/WPksRtKeV57QgN0AJwxjP8LRlbmuGrZxT4MbXNIFy1li5zuNy7S3K3HipkG+jjpRl/687vkxgskvyV6jsjaMkRDJHYuWdyR0cLh3mQur2fXtkF2uuPQjoQcwvC2b+zgDBSQNzse5K/LxL813m6e1qmS0stPHG19sLmsc0kHibuPkLLfPizrb0cL6otNKpIXaMMkRFQWqolwgn0Wxyr9owyH7LCf1r/ks5XUWOX3kr7vZG11sJDyeothbbjz9FXU2z8ZcTLhvl73eIvpnnwAVjU7vVhJLX07bm5Jje91/Eu/JRDuxXB+N1VG/L3TEADyzbY/Fce/1W2E270ViA1p1uS0OJ9f6yXOba2W1tiDGLEGzgLOA1BAItdW9XsOtfiBPZX++1hmH7rn3HoVxm19xqlt3TVBe38bWNt52Hd81ntfK+EDbZhkcO0dELHIMecjzAN8+S3UW2aylyp6h72A/ZyOuR0u4X8rkLKl3ZgIs+SUGwJ+sGh42A6rN+5lMQXROe4DjaQj1smom04b/APd/4rZxc6/vsIabcTjaNfJStlbc2dMLMqTTuzPZzMGZ195l2nPnzzvlbj5d3SL4JnNt+k+3LVaZdhThuIyYm83sBb+88fmtaht3prYI8QFVAGn3sFpi7hkwsOH+HVVO09qUow4HxG+rpI4Wn9kNb8yFwsk2E5mI2/C8j4AkfBb6GN05LI6aOR3lj8u63Epw+au3bx78TA2caSrZoGuxCS3V9yDlfUHVYO21s6U/XxPhNswOzlZ5ElrvguFl2U4kgwSNc3VoZHcW6XutccOHX2jwDWj5k/Ja4pt2039mSfZVEvdGYbT4jbmbOJVbJsqgebsqpR40k35Bc17S9hxxB7SMw5wZceYapLd4ak5uAk/WMtj5NeAnG/Bte/3bovv1ZH/bTfmAt9FutQSODG11idMULmNJ0sHPcBfpdch2ksj84mucfu4T481c0DYxcVOzrixzjdZwPQO/n5Kav2dnYP8Aoyga1znmYBmt4W2I/ED2li3nZQ490aaM4mmoF8u6GM879pcLHZu8YjazBXVMRbfDHI1xbHlbC593NcLHK7VNhq9pVP2deXMP3o5YyAeWFha66m6qsG6QsX45HuOdpOyLiP0jjJvYKy2fu3GBd8GI30a1xyt73dvY6ZZrRVUu0IznV1WL8JlMd+vecq0QbZkzjNQ4G+YqZHi3XCbK+Udv/dqFrcXsmXXFb+IZKFPFTMe3KBlj/isY4a69/vfDwXnlfQ1jjaqljYR/iSse4dAMTj5LbTbvvcO4Zp+jGlrP4iB81NSL3ekVG8lGxpa6aJg6PkeRn4kfAq02ZvS0x3jhfPEbCzIzkeLu+AMPgOC88oNzKu4LKVjT+J5c8j9kAAeq77Yu6lQW4ah0hB1aMIZbla2nilt+DUUM+wGyymVtM+7nHOUOfhBJNha2Q8CfNT5djNYcIjFiBmYyzO2TWjMnPoV0VD9G9MzMRjP9CK/rgyXR0G7sUQAjxt6CR9vME2Wpjl9JuOR2Vui0nFOwBuLuMDRjeBpj6Wtl620Xbw7Ob3S8AkaN+63/AHUqKnDc9TzOtuXRbl0mH2zaxa0DRZIvi2yyREQfEsvqIPlliWBZog0mELRUbOY/3h5gkO9RmpqKWSm3OVe7DXZtwu/1GB38Ys74rn6/daYfY07S7QEyvwC3Jtg4eGNehosXpz4a5PJptw9oSm7p44B/kgNP71i4+qxb9E7bh0wE7uJknlxHztb4L1tfLJ6f7Tk8rk+jqNo7lHb9WdhP8cawfusWN7sNU1w90tbC7CRphIcF6vZLKel+ry/HmtNsn2o3kjlp6qMXbKY8DZBwu3E4HqL8fJQxsxzHOJpwHXIIwvDfX3SP5r1CWnBVHtHdh0x+sqZAL5BtwB4WKzcMp+m5XG+ytv7kRvq3C4AcyO7fktc1LRB1nUjQcs2ta4H1DTqusZuJF96oqD/1Xj5FT6fdWJlrTVJtzqJP5pxy+jccrRN2fHkyJoItctY3O9s8lvmdTu9yGRx/RZ4Z6FdnHstg+9IfGV5/Nb20rRwPm5x+ZV4VNx5XV7Ha9xtSSMGucLnXNulhyVTJuQcRfG2WJx1MbHsJHLLIr2s07fwj0WTYgNAB5Ba4HJ5Fs3ditDbx1M8Tg73Jj2kbm52c1riQDporeP6N5ZjevrZZR+DE7D5NvYL0iyWUnSnycnObL3IoYLYKaMkfec0Od6lXrKdg0a0eAC3WSy6SSJtiGrKy+2SyqPiL7ZLIPiL7ZLIPiL7ZLIPqIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgL6iIP//Z" alt="first page image " />
                </div>
            </div>
            <div style={{ height: '30vmin', width: "100%" }} >
            </div>
            <div className="parant-profile-cards" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '1.5rem',
                alignItems: 'start'
            }} >
                {mapuser.map((item) => (
                    <div key={item._id} className="profile-card" style={{ marginBottom: '20px' }} onClick={() => profile_disply(item._id)}>
                        <div className="profile-image-wrapper">
                            <img
                                src={
                                    item.photo
                                        ? item.photo
                                        : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
                                }
                                alt="profile"
                            />
                        </div>
                        <h2 className="profile-name">{item.name}</h2>
                        <p className="profile-role">{item.email}</p>
                        <p className="profile-location">New York, NY</p>
                    </div>
                ))}
            </div>


            <div style={{ width: '100%', height: '100vh' }} >

            </div>
        </div >
    )
}