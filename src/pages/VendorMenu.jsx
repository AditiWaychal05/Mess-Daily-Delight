import { useEffect, useMemo, useRef, useState } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Pencil, Trash2, X, UtensilsCrossed, ImageOff, UserX, CheckCircle2, Calendar as CalendarIcon, Search } from "lucide-react";
import { toast } from "sonner";
import {
  getMeals,
  addMeal as addMealLS,
  updateMeal as updateMealLS,
  deleteMeal as deleteMealLS,
  getSkipsForDate,
  addSkip,
  removeSkip,
  totalSkippedThisMonth,
  todayKey,
} from "@/lib/meals";

const emptyForm = { name: "", price: "", desc: "", image: "" };

const VendorMenu = () => {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const fileRef = useRef(null);

  // Skip-meal state
  const [skips, setSkips] = useState([]);
  const [skipForm, setSkipForm] = useState({ user: "", meal: "Lunch" });
  const [monthlySkips, setMonthlySkips] = useState(0);

  useEffect(() => {
    setMeals(getMeals());
    setSkips(getSkipsForDate());
    setMonthlySkips(totalSkippedThisMonth());
  }, []);

  const filtered = useMemo(
    () => meals.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())),
    [meals, search],
  );

  // ---------- Image handling ----------
  const readFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be under 4MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((f) => ({ ...f, image: e.target.result }));
      setErrors((er) => ({ ...er, image: undefined }));
      toast.success("Image uploaded");
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e) => readFile(e.target.files?.[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    readFile(e.dataTransfer.files?.[0]);
  };

  // ---------- CRUD ----------
  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Meal name is required";
    if (!form.price || Number(form.price) <= 0) er.price = "Enter a valid price";
    if (!form.desc.trim()) er.desc = "Add a short description";
    if (!form.image) er.image = "Please upload an image";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = () => {
    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    const payload = { ...form, price: Number(form.price) };
    if (editingId) {
      const next = updateMealLS(editingId, payload);
      setMeals(next);
      toast.success("Meal updated successfully");
    } else {
      const next = addMealLS(payload);
      setMeals(next);
      toast.success("Meal added successfully");
    }
    resetForm();
  };

  const handleEdit = (meal) => {
    setEditingId(meal.id);
    setForm({ name: meal.name, price: String(meal.price), desc: meal.desc, image: meal.image });
    setErrors({});
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const next = deleteMealLS(id);
    setMeals(next);
    toast.success("Meal removed");
    if (editingId === id) resetForm();
  };

  // ---------- Skips ----------
  const handleAddSkip = () => {
    if (!skipForm.user.trim()) {
      toast.error("Enter customer name");
      return;
    }
    const next = addSkip({ user: skipForm.user.trim(), meal: skipForm.meal });
    setSkips(next);
    setMonthlySkips(totalSkippedThisMonth());
    setSkipForm({ user: "", meal: "Lunch" });
    toast.success(`${next[0].user} marked as not coming today`);
  };

  const handleUnskip = (idx) => {
    const next = removeSkip(idx);
    setSkips(next);
    setMonthlySkips(totalSkippedThisMonth());
    toast.success("Marked as coming");
  };

  const todayLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <VendorLayout>
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Menu Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Add, edit and manage your daily meal offerings.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search meals..."
                className="pl-9 rounded-xl w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Meals", value: meals.length, icon: UtensilsCrossed, tint: "from-primary to-[hsl(28_100%_55%)]" },
            { label: "Skipped Today", value: skips.length, icon: UserX, tint: "from-warning to-warning/70" },
            { label: "Coming Today", value: Math.max(0, 142 - skips.length), icon: CheckCircle2, tint: "from-success to-success/70" },
            { label: "Skips This Month", value: monthlySkips, icon: CalendarIcon, tint: "from-primary/80 to-primary/60" },
          ].map((s, i) => (
            <Card
              key={s.label}
              className="rounded-2xl border-border/60 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.tint} flex items-center justify-center shadow-card`}>
                  <s.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                  <div className="font-heading text-2xl font-bold text-foreground">{s.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meals grid */}
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-heading text-lg">Your Meals</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{filtered.length} meal{filtered.length !== 1 && "s"} on offer</p>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <ImageOff className="w-9 h-9 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  {meals.length === 0 ? "No meals added yet" : "No meals match your search"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  {meals.length === 0
                    ? "Use the form below to add your first meal. It will appear here instantly."
                    : "Try a different keyword or clear the search."}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((meal) => (
                  <div
                    key={meal.id}
                    className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 animate-fade-in"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 left-3 bg-card/95 text-foreground hover:bg-card backdrop-blur shadow-card border-0">
                        ₹{meal.price}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-heading font-semibold text-foreground">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{meal.desc}</p>
                      <div className="flex items-center gap-2 pt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl flex-1 gap-1.5"
                          onClick={() => handleEdit(meal)}
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl flex-1 gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                          onClick={() => handleDelete(meal.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add / Edit form */}
        <Card className="rounded-2xl border-border/60 shadow-card animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                {editingId ? <><Pencil className="w-4 h-4 text-primary" /> Edit Meal</> : <><Plus className="w-4 h-4 text-primary" /> Add New Meal</>}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {editingId ? "Update details and save changes." : "Fill in the details to add a meal to your menu."}
              </p>
            </div>
            {editingId && (
              <Button variant="ghost" size="sm" onClick={resetForm} className="rounded-xl gap-1.5">
                <X className="w-3.5 h-3.5" /> Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Image uploader */}
              <div className="space-y-2">
                <Label>Meal Image</Label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer transition-all min-h-[220px] flex items-center justify-center
                    ${dragOver ? "border-primary bg-primary/5" : errors.image ? "border-destructive/50" : "border-border hover:border-primary"}
                  `}
                >
                  {form.image ? (
                    <>
                      <img src={form.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                        <span className="text-xs text-white font-medium">Click or drop to replace</span>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-xl h-8"
                          onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, image: "" })); }}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-14 h-14 rounded-2xl gradient-orange mx-auto flex items-center justify-center shadow-card mb-3">
                        <Upload className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Drop an image or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 4MB</p>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                </div>
                {errors.image && <p className="text-xs text-destructive">{errors.image}</p>}
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Meal Name</Label>
                    <Input
                      placeholder="e.g. Veg Thali"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Price (₹)</Label>
                    <Input
                      type="number"
                      placeholder="80"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className={`rounded-xl ${errors.price ? "border-destructive" : ""}`}
                    />
                    {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Rice, Dal, Sabzi, 2 Roti, Salad..."
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    className={`rounded-xl min-h-[110px] ${errors.desc ? "border-destructive" : ""}`}
                  />
                  {errors.desc && <p className="text-xs text-destructive">{errors.desc}</p>}
                </div>
                <div className="flex gap-2 pt-1">
                  <Button onClick={handleSave} className="rounded-xl gap-2 shadow-card">
                    {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingId ? "Save Changes" : "Add Meal"}
                  </Button>
                  <Button variant="outline" onClick={resetForm} className="rounded-xl">Reset</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skip Meal feature */}
        <Card className="rounded-2xl border-border/60 shadow-card animate-fade-in">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <UserX className="w-4 h-4 text-warning" /> Skip Meal Today
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Subscribers who won't be eating today &middot; {todayLabel}
              </p>
            </div>
            <Badge variant="secondary" className="rounded-xl">{skips.length} skipped</Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Add skip */}
            <div className="grid sm:grid-cols-[1fr_160px_auto] gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60">
              <Input
                placeholder="Customer name (e.g. Rahul Sharma)"
                value={skipForm.user}
                onChange={(e) => setSkipForm({ ...skipForm, user: e.target.value })}
                className="rounded-xl bg-card"
              />
              <select
                value={skipForm.meal}
                onChange={(e) => setSkipForm({ ...skipForm, meal: e.target.value })}
                className="h-10 rounded-xl border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Both</option>
              </select>
              <Button onClick={handleAddSkip} className="rounded-xl gap-2">
                <UserX className="w-4 h-4" /> Mark Skipped
              </Button>
            </div>

            {/* Skip list */}
            {skips.length === 0 ? (
              <div className="text-center py-10 text-sm text-muted-foreground">
                <CheckCircle2 className="w-8 h-8 mx-auto text-success mb-2" />
                Everyone is coming today. 🎉
              </div>
            ) : (
              <div className="divide-y divide-border rounded-2xl border border-border/60 overflow-hidden">
                {skips.map((s, idx) => (
                  <div
                    key={`${s.user}-${s.at}`}
                    className="flex items-center justify-between p-3.5 hover:bg-muted/40 transition-colors animate-fade-in"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-warning/15 text-warning flex items-center justify-center font-heading font-semibold text-sm">
                        {s.user.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{s.user}</div>
                        <div className="text-xs text-muted-foreground">
                          Skipping {s.meal} &middot; {new Date(s.at).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-warning/15 text-warning hover:bg-warning/20 border-0">Not Coming</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl text-success hover:text-success hover:bg-success/10"
                        onClick={() => handleUnskip(idx)}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Saved meals summary */}
            {skips.length > 0 && (
              <div className="flex items-center justify-between p-4 rounded-2xl gradient-orange text-primary-foreground shadow-card">
                <div>
                  <div className="text-xs uppercase tracking-wider opacity-80">Saved meals today</div>
                  <div className="font-heading text-2xl font-bold">{skips.length} meals</div>
                </div>
                <div className="text-right text-xs opacity-90 max-w-[200px]">
                  Less prep, less waste. Great job running a sustainable mess! 🌱
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorMenu;
