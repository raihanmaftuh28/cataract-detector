const Navbar = () => {
  return (
    <div className="bg-[#2B2118] py-4 sticky top-0 ">
      <div className="mr-[8rem] ml-[8rem] text-white text-[18px] font-semibold space-x-5 font-outfit flex">
        <a
          className="hover:scale-110 transition delay-100"
          href="https://colab.research.google.com/drive/1NJPLx8MGNE0XayHYwE22Jp7tuN6Dfs-8?usp=sharing"
        >
          <p>Google Colab</p>
        </a>
        <a
          className="hover:scale-110 transition delay-100"
          href="https://github.com/raihanmaftuh28/cataract-detector"
        >
          <p>Github</p>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
